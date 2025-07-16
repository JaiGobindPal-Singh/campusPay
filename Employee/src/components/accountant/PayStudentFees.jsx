import { useState,useRef,useEffect } from "react";
import axiosInstance from "../../utils/axios";
import PrintReciept from "./printReciept";
import { useNavigate } from "react-router-dom";
const PayStudentFees = () => {
     const Navigate = useNavigate();
     const [student, setStudent] = useState("")
     const [studentRollNo, setStudentRollNo] = useState("")
     const [feeAmount, setFeeAmount] = useState('')
     const [loading, setLoading] = useState(true);
     const focusRef = useRef(null);
     const [receiptData, setReceiptData] = useState(null);
     useEffect(()=>{
          //focus on the roll number input field when the component mounts
          focusRef.current = document.getElementById("rollNo");
          if (focusRef.current) {
               focusRef.current.focus();
          }
     },[])
     // Setup for Escape key navigation
     useEffect(() => {
          const handleEscKey = (event) => {
               if (event.key === 'Escape') {
                    Navigate('/');
               }
          };
          document.addEventListener('keydown', handleEscKey);
          return () => {
               document.removeEventListener('keydown', handleEscKey);
          };
     }, [Navigate]);
     
     const submitHandler = async (e) => {
          try {
               e.preventDefault();
               setLoading(true);
               const response = await axiosInstance.post('/accountant/PayFees', {
                    rollNo: student.rollNo,
                    amount: feeAmount
               });
               if (response) {
                    console.log(response.data);
                    setReceiptData({
                         paymentId: response.data.result.id,
                         amount: response.data.result.amount,
                         date: new Date(response.data.result.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                         }),
                         rollNo: response.data.rollNo,
                         name: student.name
                    })
                    // <PrintReciept receiptData={receiptData}/>
                    setStudent(null);
                    setStudentRollNo("");
                    setFeeAmount("");
               }
          } catch (e) {
               console.error("Error recording payment:", e);
               alert("Failed to record payment. Please try again.");
          } finally {
               setLoading(false);
          }
     }
     //function to get the student details based on the roll number
     const handleSearch = async () => {
          try {
               setLoading(true);
               const response = await axiosInstance.post('/accountant/StudentDetails', { rollNo: studentRollNo });
               if (response) {
                    const data = response.data.student;
                    setStudent(data);
               }
                    setLoading(false);
               }catch (e) {
                    setStudent("not found");
                    console.error("Error fetching student details:", e);
                    
               }finally{
                    setLoading(false);
               }

          }
          if(receiptData){
               return <PrintReciept receiptData={receiptData} />
          }
     return (
               <div className="container mx-auto p-4 max-w-2xl flex flex-col justify-center min-h-screen">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Pay Student Fees</h1>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                         <div className="mb-2">
                              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-1">
                                   Search Student
                              </label>
                              <div className="flex justify-center gap-4">

                              <input
                                   ref={focusRef}
                                   type="number"
                                   id="rollNo"
                                   placeholder="enter student roll number"
                                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value={studentRollNo}
                                   onChange={e => setStudentRollNo(e.target.value)}
                                   onKeyDown={e=>{
                                        if (e.key === 'Enter') {
                                             e.preventDefault();
                                             handleSearch();
                                             const nextElement = document.getElementById("amount");
                                             if (nextElement) {
                                                  nextElement.focus();
                                             }
                                        }
                                   }}/>
                                   <button
                                        onClick={handleSearch}
                                        className=" px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={loading || !studentRollNo}
                                        >GO</button>
                                        </div>
                         </div>

                         {student && student == "not found"? <div className="text-red-600 font-semibold mt-0">no student found</div> :student && (
                              <div className="bg-gray-50 p-4 rounded-md mb-6">
                                   <h3 className="font-medium text-gray-700 mb-2">Selected Student:</h3>
                                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                             <p className="font-semibold text-lg">{student.name}</p>
                                             <p className="text-sm text-gray-600">Roll Number: {student.rollNo}</p>
                                             <p className="text-sm text-gray-600">Class: {student.degree} {student.semester}</p>
                                             <p className="text-sm text-gray-600">Pending Fees: {student.pendingFees + student.fine}</p>
                                        </div>
                                        <button
                                             onClick={() => {setStudent(null); setStudentRollNo(""); setFeeAmount("")}}
                                             className="text-sm text-red-600 hover:text-red-800"
                                        >
                                             Change
                                        </button>
                                   </div>
                              </div>
                         )}

                         <form className="space-y-4" onSubmit={submitHandler}>
                              <div>
                                   <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                        Fee Amount
                                   </label>
                                   <input
                                        type="number"
                                        id="amount"
                                        placeholder="Enter amount"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={feeAmount}
                                        onChange={(e) => setFeeAmount(e.target.value)}
                                        required
                                   />
                              </div>
                              <div className="pt-2">
                                   <button
                                        type="submit"
                                        disabled={loading || !student || student == "not found" || !feeAmount}
                                        className={`w-full py-2 px-4 rounded-md font-medium text-white 
                                        ${loading || !student || student == "not found" || !feeAmount  ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                   >
                                        'Record Payment'
                                   </button>
                              </div>
                         </form>
                    </div>

                    <div className="text-sm text-gray-500 mt-2 italic text-center">
                         Note: All fee payments are logged and receipts are automatically generated.
                    </div>
               </div>
          );
     };

     export default PayStudentFees;