import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch parcel info using react-query
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId,
  });

  if (isPending) {
    return (
      <div className="text-center py-10 font-semibold">
        Loading parcel info...
      </div>
    );
  }

  // যদি parcelInfo থেকে payment_status পাওয়া যায় এবং paid হয়, সেটাকে ধরে নিচ্ছি পেমেন্ট হয়েছে
  const isPaid = parcelInfo?.payment_status === "paid";

  const amount = parcelInfo?.cost || 0;
  const amountInCents = Math.round(amount * 100); // Stripe expects integer cents

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isPaid) return; // যদি already paid হয় তাহলে কাজ করবেনা

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);
    setError("");

    // Step 1: Create payment method
    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setIsProcessing(false);
      return;
    }

    try {
      // Step 2: Create payment intent on backend
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);

        // Step 4: Save payment info to backend and update parcel payment_status
        const paymentData = {
          parcelId,
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const saveRes = await axiosSecure.post("/payments", paymentData);

        if (saveRes.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
            confirmButtonText: "Go to My Parcels",
          });

          navigate("/dashboard/myParcels");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Make a Payment
        </h2>

        {!isPaid ? (
          <CardElement className="p-2 border rounded" />
        ) : (
          <div className="p-4 bg-green-100 text-green-800 rounded text-center font-semibold">
            Payment Already Completed
          </div>
        )}

        <button
          type="submit"
          className={`btn w-full text-white ${
            isPaid ? "bg-green-600 cursor-not-allowed" : "btn-primary"
          }`}
          disabled={!stripe || isProcessing || isPaid}
        >
          {isPaid ? "Paid" : isProcessing ? "Processing..." : `Pay $${amount}`}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {paymentSuccess && !isPaid && (
          <p className="text-green-600 font-medium">Payment successful!</p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
