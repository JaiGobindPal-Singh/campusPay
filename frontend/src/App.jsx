import React from 'react'
import axiosInstance from './utils/axios'
import { useState } from 'react'

function App() {
  const [amount, setAmount] = useState(0);
  const paymentVerificationResponse = async (response) => {
    try {
      const result = await axiosInstance.post('/student/verify-payment/', {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        signature: response.razorpay_signature,
        amount: amount
      })
      console.log(result);
      if (result.data.success) {
        console.log('Payment verified successfully:', result.data);
      } else {
        throw new Error('Payment verification failed');
      }
    }catch (error) {
      console.error('Payment verification failed:', error);
    }
  }
  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post('/student/payfees/', {
        amount:amount ,
      });
      const { order, razorpayKey, student } = response.data;
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: 'INR',
        name: 'Campus` Pay',
        description: 'Fees Payment',
        order_id: order.id,
        handler: paymentVerificationResponse,
        prefill: {
          name: student.name,
          contact: student.mobile,
        },
        theme: {
          color: '#F37254'
        },
        modal: {
          ondismiss: function () {
            console.log('Payment cancelled by user');
          }
        }
      };

      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        console.error('Razorpay SDK not loaded');
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', function (response) {
        alert('Payment failed:', response);
      });

    } catch (error) {
      console.error('Payment failed:', error);
    }
  };
  const login = async () => {
    try {

      axiosInstance.post('/login/student', {
        "rollNo": 7301,
        "mobile": 8872727594
      })

    } catch (error) {
      console.error('Login failed:', error);
    }
  }
  return (
    <div>
      <input type="text" value={amount} onChange={(e)=>{
        setAmount(e.target.value);
      }} />
      <button onClick={handlePayment}>click for payment</button>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default App
