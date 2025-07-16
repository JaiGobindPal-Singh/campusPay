import { useEffect, useState } from "react";
import { loadStudentData } from "../../authentication/handleRefresh";
import { useDispatch } from "react-redux";
import { setStudentData } from "../../../redux/slices/student/studentSlice.js"
import Loading from "../../../layouts/Loading.jsx";
const HandleSuccessPayment = (props) => {
        const { amount, } = props;
        const dispatch = useDispatch();
        const [isloading, setIsloading] = useState(true);
        useEffect(() => {
                const updateStudentData = async () => {
                        const updatedStudentData = await loadStudentData();
                        dispatch(setStudentData(updatedStudentData));
                        setIsloading(false);
                }
                updateStudentData();
        }, [dispatch])

        if (isloading) {
                return <Loading />
        }
        return (
                <div>
                        <div className='absolute min-w-screen min-h-screen bg-black/35 flex items-center justify-center'>
                                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                                        <div className="flex flex-col items-center">
                                                <div className="bg-green-100 p-3 rounded-full">
                                                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                </div>
                                                <h2 className="mt-4 text-2xl font-bold text-gray-800">Payment Successful!</h2>
                                                <p className="mt-2 text-gray-600">Your payment of ₹{amount} has been processed successfully.</p>
                                                <button
                                                        onClick={() => { window.location.reload(); }}
                                                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                        Back to Dashboard
                                                </button>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default HandleSuccessPayment
