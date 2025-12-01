import { useMutation } from "@tanstack/react-query";
import { verifyOrder } from "../../service/requests/payment";

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: (verifyData: {
      razorpay_signature: string;
      razorpay_order_id: string;
      razorpay_payment_id: string;
    }) => verifyOrder(verifyData),
  });
};
