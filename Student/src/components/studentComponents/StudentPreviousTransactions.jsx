import { useEffect, useState } from "react"
import Loading from "../../layouts/Loading"
import axiosInstance from "../../utils/axios"
import Navbar from "../../layouts/Navbar"
const StudentPreviousTransactions = () => {
     const [isloading, setIsloading] = useState(true)
     const [transactions, setTransactions] = useState([])
     useEffect(() => {
          async function loadTransactions() {
               try {
                    const response = await axiosInstance.post('/student/previoustransactions');
                    if (response) {
                         setTransactions(response.data.transactions.reverse() || []);
                    }
               } catch (err) {
                    console.error("Error fetching transactions:", err);
               }
               setIsloading(false);
          }
          loadTransactions();
     }, [])
     if (isloading) {
          return <Loading />
     }
     return (
          <div>
               <Navbar studentPage={true} />
               <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-6">Previous Transactions</h1>
                    {transactions.length > 0 ? (
                         <div className="overflow-x-auto">
                              <table className="min-w-full bg-white rounded-lg shadow">
                                   <thead className="bg-gray-100">
                                        <tr>
                                             <th className="py-3 px-4 text-left">ID</th>
                                             <th className="py-3 px-4 text-left">Amount</th>
                                             <th className="py-3 px-4 text-left">Date</th>
                                             <th className="py-3 px-4 text-left">Mode</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {transactions.map((transaction, count) => (
                                             <tr key={count} className="border-t hover:bg-gray-50">
                                                  
                                                  <td className="py-3 px-4">{count + 1}  &nbsp;&nbsp;  { transaction.id}</td>
                                                  <td className="py-3 px-4">₹{transaction.amount}</td>
                                                  <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                                                  <td className="py-3 px-4">
                                                       <span className={`px-2 py-1 rounded-full text-xs ${transaction.online? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {transaction.online?"online":"offline"}
                                                       </span>
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    ) : (
                         <div className="text-center py-8 bg-gray-50 rounded-lg">
                              <p className="text-gray-500">No transaction history available.</p>
                         </div>
                    )}
               </div>
          </div>
     )
}

export default StudentPreviousTransactions
