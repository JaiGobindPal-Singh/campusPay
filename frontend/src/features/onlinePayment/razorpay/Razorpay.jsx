import axiosInstance from "../../../utils/axios";
import { useState } from "react"
import HandleSuccessPayment from "./HandleSuccessPayment";
import HandleFailedPayment from "./HandleFailedPayment";

const Razorpay = (props) => {
  const { student, setShowPayFeesComponent} = props;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [amount, setamount] = useState(student.pendingFees + student.fine || 0);
  const verifyPayment = async (response) => {
    try {
      const result = await axiosInstance.post('/student/verify-payment/', {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        signature: response.razorpay_signature,
        amount: amount
      })
      if (result.data.success) {
        setIsSuccess(true);
      } else {
        alert("payment is pending")
      }
    } catch (error) {
      alert("payment verification failed",error.message)
    }
  }
  //* function to handle the payment
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
        handler: verifyPayment,
        prefill: {
          name: student.name,
          contact: student.mobile,
        },
        theme: {
          color: '#432dd7'
        },
        modal: {
          ondismiss: function () {
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
      rzp.on('payment.failed', function () {
        setIsFailed(true);
      });
    } catch (error) {
      setIsFailed(true);
      console.error('Payment failed', error);
    }
  };

  //*return to success page if payment is successful
  if(isSuccess){
    return <HandleSuccessPayment amount={amount} setShowPayFeesComponent= {setShowPayFeesComponent} />
  }
  if(isFailed){
    return <HandleFailedPayment />
  }
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="max-sm:min-w-[50%] min-w-sm mx-auto p-6 bg-white rounded-lg shadow-md border-t-4 border-indigo-700">
        <div className="flex justify-start mb-4">
          <button
            onClick={() => setShowPayFeesComponent(false)}
            className="flex items-center text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Fee Payment</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">Student Details</h3>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <div className="grid grid-cols-1 gap-3">
              <p className="mb-1"><span className="font-medium text-indigo-700">Name: </span> {student?.name || 'Loading...'}</p>
              <p className="mb-1"><span className="font-medium text-indigo-700">Roll No: </span> {student?.rollNo || 'Loading...'}</p>
              <p><span className="font-medium text-indigo-700">Contact: </span> {student?.mobile || 'Loading...'}</p>
              <p><span className="font-medium text-indigo-700">Pending fees: </span> ₹{student?.pendingFees + student?.fine || 'Loading...'}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium mb-2 text-indigo-700">
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setamount((e.target.value))}
            className="w-full p-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-700"
            placeholder="Enter amount to pay"
          />
          { amount > student.pendingFees + student.fine && <p className="text-red-700 text-sm">amount exceeds the pending fees</p> }
          { amount <= 0 && <p className="text-red-700 text-sm">amount must be more than 0</p> }
        </div>
        
        <button
          onClick={handlePayment}
          disabled={!amount || amount <= 0 || amount > student.pendingFees + student.fine}
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md shadow-md disabled:bg-gray-400 transition duration-200"
        >
          Pay Now
        </button>
        
        <p className="text-sm text-indigo-500 mt-4 text-center">
          Secure payments powered by Razorpay
        </p>
      </div>
    </div>
  )
}

export default Razorpay
