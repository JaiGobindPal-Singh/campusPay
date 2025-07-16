import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const PrintReciept = (props) => {
     const Navigate = useNavigate();
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
     
     const [isVisible, setIsVisible] = useState(true);
     // const receiptData = {
     //      paymentId: "PAY123456",
     //      amount: "$100.00",
     //      date: new Date().toLocaleDateString(),
     //      rollNo: "R12345",
     //      name: "John Doe"
     // };
     const receiptData = props.receiptData
     const handleClose = () => {
          Navigate('/')
          setIsVisible(false);
     };

     if (!isVisible) return null;

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
               <div className="bg-white w-[210mm] h-[40rem] p-10 shadow-lg" style={{ pageBreakInside: 'avoid' }}>
                    <div className="text-center mb-8">
                         <h2 className="text-3xl font-bold">Payment Receipt</h2>
                    </div>
                    
                    <div className="border-t border-b py-6 mb-8">
                         <div className="flex justify-between py-3">
                              <span className="text-lg font-semibold">Payment ID:</span>
                              <span className="text-lg">{receiptData.paymentId}</span>
                         </div>
                         <div className="flex justify-between py-3">
                              <span className="text-lg font-semibold">Student Name:</span>
                              <span className="text-lg">{receiptData.name}</span>
                         </div>
                         <div className="flex justify-between py-3">
                              <span className="text-lg font-semibold">Roll Number:</span>
                              <span className="text-lg">{receiptData.rollNo}</span>
                         </div>
                         <div className="flex justify-between py-3">
                              <span className="text-lg font-semibold">Date:</span>
                              <span className="text-lg">{receiptData.date}</span>
                         </div>
                         <div className="flex justify-between py-3">
                              <span className="text-lg font-semibold">Amount Paid:</span>
                              <span className="text-lg text-green-600 font-bold">{receiptData.amount}</span>
                         </div>
                    </div>
                    
                    <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-4 print:hidden">
                         <button 
                              onClick={handleClose}
                              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                         >
                              Close
                         </button>
                         <button 
                              onClick={() => window.print()}
                              className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
                         >
                              Print
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default PrintReciept
