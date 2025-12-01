import { useMutation } from "@tanstack/react-query";
import { bookTicket } from "../../service/requests/bus";

export const useBookTicket = () => {
  return useMutation({
    mutationFn: (ticketData: {
      busId: string;
      date: string;
      seatNumbers: number[];
    }) => bookTicket(ticketData),
  });
};
