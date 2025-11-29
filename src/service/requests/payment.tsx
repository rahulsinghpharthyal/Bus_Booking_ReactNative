import apiClient from "../apiClient"


export const createOrder = async (amount: Number) => {
    const response = await apiClient.post('/api/v1/payment/create-order', {
        amount
    });
    return response.data;
}

export const verifyOrder = async (verifyData: {razorpay_signature: string; razorpay_order_id: string; razorpay_payment_id: string;}) => {
    const response = await apiClient.post('/api/v1/payment/verify', verifyData);
    return response.data;

}