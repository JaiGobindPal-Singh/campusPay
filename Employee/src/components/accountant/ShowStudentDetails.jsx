import axiosInstance from "../../utils/axios.js"
import { useRef, useState } from 'react';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const ShowStudentDetails = () => {
     const Navigate = useNavigate();
     const [rollNo, setRollNo] = useState('');
     const [student, setStudent] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState('');
     const setFocus = useRef(null);
     // Setup for Escape key navigation
     useEffect(() => {
          setFocus.current.focus();
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
     

     const handleSearch = async (e) => {
          e.preventDefault();
          setLoading(true);
          setError('');

          try {
               const studentData = await axiosInstance.post("/accountant/studentDetails", { rollNo });
               if (studentData) {
                    studentData.data.student.previousTransactions = studentData.data.student.previousTransactions.reverse(); 
                    setStudent(studentData.data.student);
               } else {
                    setError('Student not found. Please check the roll number.');
                    setStudent(null);
               }
          } catch (err) {
               setError('Failed to fetch student details. Please try again.');
               console.log(err);
               setStudent(null);
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
               <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                         <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Student Details</h1>

                         <form onSubmit={handleSearch} className="mb-6">
                              <div className="flex flex-col md:flex-row gap-4">
                                   <input
                                        ref={setFocus}
                                        type="text"
                                        value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)}
                                        placeholder="Enter Roll Number"
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                   />
                                   <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        disabled={loading}
                                   >
                                        {loading ? 'Searching...' : 'Search'}
                                   </button>
                              </div>
                         </form>

                         {error && (
                              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                                   <p>{error}</p>
                              </div>
                         )}

                         {student && (
                              <div className="bg-white rounded-lg overflow-hidden">
                                   <div className="bg-gray-50 p-6 border-b">
                                        <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
                                        <p className="text-gray-600">Roll Number: {student.rollNo}</p>
                                        <p className="text-gray-600">Mobile: {student.mobile}</p>
                                   </div>

                                   <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                             <div className="bg-blue-50 p-4 rounded-lg">
                                                  <h3 className="text-lg font-medium text-blue-800 mb-2">Pending Fees</h3>
                                                  <p className="text-3xl font-bold text-blue-600">₹{student.pendingFees.toLocaleString()}</p>
                                             </div>

                                             <div className="bg-red-50 p-4 rounded-lg">
                                                  <h3 className="text-lg font-medium text-red-800 mb-2">Fine Amount</h3>
                                                  <p className="text-3xl font-bold text-red-600">₹{student.fine.toLocaleString()}</p>
                                             </div>
                                        </div>

                                        <div className="mt-8">
                                             <h3 className="text-xl font-semibold text-gray-700 mb-4">Previous Transactions</h3>
                                             {student.previousTransactions.length > 0 ? (
                                                  <div className="overflow-x-auto">
                                                       <table className="min-w-full bg-white">
                                                            <thead>
                                                                 <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                                                      <th className="py-3 px-6 text-left">ID</th>
                                                                      <th className="py-3 px-6 text-left">Date</th>
                                                                      <th className="py-3 px-6 text-left">Mode</th>
                                                                      <th className="py-3 px-6 text-left">Amount</th>
                                                                      <th className="py-3 px-6 text-left">Status</th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody className="text-gray-600 text-sm font-sans">
                                                                 {(student.previousTransactions).map((transaction,key) => (
                                                                      <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                                                                           <td className="py-3 px-6 text-left">{transaction.id}</td>
                                                                           <td className="py-3 px-6 text-left">{new Date(transaction.date).toLocaleDateString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'long',
                                                                                day: 'numeric',
                                                                           })}</td>
                                                                           <td className="py-3 px-6 text-left">{transaction.online?"Online":"Offline"}</td>
                                                                           <td className="py-3 px-6 text-left">₹{transaction.amount.toLocaleString()}</td>
                                                                           <td className="py-3 px-6 text-left">{transaction.online ?transaction.online.status:"success"}</td>
                                                                      </tr>
                                                                 ))}
                                                            </tbody>
                                                       </table>
                                                  </div>
                                             ) : (
                                                  <p className="text-gray-500 italic">No previous transactions found.</p>
                                             )}
                                        </div>
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
}
export default ShowStudentDetails;