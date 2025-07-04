import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/useAuth";
import useTrackingLogger from "../../hooks/useTrackingLogger";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const {logTracking} = useTrackingLogger()
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch parcel info by ID
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
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  const isPaid = parcelInfo?.payment_status === "paid";
  const amount = parcelInfo?.cost || 0;
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isPaid) return;

    setIsProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Step 1: Create payment method
    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setIsProcessing(false);
      return;
    }

    try {
      // Step 2: Create payment intent from backend
      const intentRes = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = intentRes?.data?.clientSecret;

      if (!clientSecret) {
        setError("Payment intent creation failed.");
        setIsProcessing(false);
        return;
      }

      // Step 3: Confirm payment with Stripe
      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || "Anonymous",
            email: user.email,
          },
        },
      });

      if (confirmResult.error) {
        setError(confirmResult.error.message);
        setIsProcessing(false);
        return;
      }

      if (confirmResult.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);

        // Step 4: Save payment info to backend
        const paymentData = {
          parcelId,
          email: user.email,
          amount,
          transactionId: confirmResult.paymentIntent.id,
          paymentMethod: confirmResult.paymentIntent.payment_method_types[0],
        };

        const saveRes = await axiosSecure.post("/payments", paymentData);

        if (saveRes.data?.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${confirmResult.paymentIntent.id}</code>`,
            confirmButtonText: "Go to My Parcels",
          });
          await logTracking(
            {
              tracking_id: parcelInfo.tracking_id,
              status: "payment_done",
              details: `Paid by ${user.displayName}`,
              updated_by: user.email,
            }
          )
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
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Complete Your Payment
        </h2>

        {!isPaid ? (
          <CardElement className="p-2 border rounded-md" />
        ) : (
          <div className="p-4 bg-green-100 text-green-800 rounded text-center font-semibold">
            Payment Already Completed
          </div>
        )}

        <button
          type="submit"
          className={`btn w-full mt-4 text-white ${
            isPaid ? "bg-green-600 cursor-not-allowed" : "btn-primary"
          }`}
          disabled={!stripe || isProcessing || isPaid}
        >
          {isPaid ? "Paid" : isProcessing ? "Processing..." : `Pay $${amount}`}
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {paymentSuccess && !isPaid && (
          <p className="text-green-600 font-medium mt-2">Payment successful!</p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
