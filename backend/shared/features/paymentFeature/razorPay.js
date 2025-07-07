import { config } from 'dotenv';
config();
import crypto from 'crypto';
import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID,
    key_secret: process.env.RAZORPAY_KEYSECRET,
});
export const createRazorpayOrder = async (amount) => {
    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`, // Unique receipt identifier
        };
        const order = await razorpayInstance.orders.create(options);
        return order;

    } catch (error) {
        console.log('Error creating Razorpay order:', error);
        throw new Error('Failed to create Razorpay order');
    }
}
export const getRazorpayKey = () => {
    return process.env.RAZORPAY_KEYID;
}
export const verifyRazorpayPayment = async (signature,order_id,payment_id) => {
    try {
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEYSECRET)
            .update(`${order_id}|${payment_id}`)
            .digest('hex');
        return generatedSignature === signature;

    } catch (err) {
        console.log('Error verifying Razorpay payment:', err);
        throw new Error('Failed to verify Razorpay payment');
    }
}