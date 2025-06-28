import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <div className="text-center py-10 font-semibold">Loading payment history...</div>;
  }

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Payment History</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Transaction ID</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td className="text-xs">{payment.parcelId}</td>
              <td className="text-xs">{payment.transactionId}</td>
              <td>{payment.paymentMethod?.[0]}</td>
              <td>${payment.amount}</td>
              <td>{format(new Date(payment.paid_at), "PPP p")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
