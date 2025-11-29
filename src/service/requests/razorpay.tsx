import RazorpayCheckout from "react-native-razorpay";

interface RazorpayData {
  key: string;
  currency: string;
  amount: number;
  orderId: string;
}


export const openRazorpayCheckout = async (data: RazorpayData) => {
  const options = {
    key: data.key,
    currency: data.currency,
    amount: data.amount,
    order_id: data.orderId,
    name: "Bus Booking",
    description: "Ticket Payment",
    // prefill: {
    //   email: user.email,
    //   name: user.name,
    // },
    theme: { color: "#F37254" },
  };
  return RazorpayCheckout.open(options);
};
