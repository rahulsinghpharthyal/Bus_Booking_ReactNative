import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../service/requests/payment";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (amount: number) => createOrder(amount),
  });
};
