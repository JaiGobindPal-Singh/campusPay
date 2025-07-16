import {useState, useEffect, useRef} from 'react'
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
const AddScholarship = () => {
     const setFocus = useRef(null);
const Navigate = useNavigate();
const [formData, setFormData] = useState({
     rollNumber: '',
     scholarshipAmount: '',
     remarks: ''
});
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

const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState({ text: '', type: '' });

const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData(prevData => ({
          ...prevData,
          [name]: value
     }));
};

const handleSubmit = async (e) => {
     e.preventDefault();
     setIsLoading(true);
     
     try {
          const response = await axiosInstance.post('/accountant/Scholarship', {
               rollNo: formData.rollNumber,
               scholarshipAmount: formData.scholarshipAmount,
               remarks: formData.remarks
          })
          if(!response){
               throw new Error("Failed to add scholarship");
          }
          setMessage({ text: 'Scholarship added successfully!', type: 'success' });
          setFormData({ rollNumber: '', scholarshipAmount: '', remarks: '' });
     } catch (error) {
          setMessage({ text: 'Failed to add scholarship', type: 'error' });
          console.error(error);
     } finally {
          setIsLoading(false);
          setTimeout(() => setMessage({ text: '', type: '' }), 3000);
     }
};

return (
     <div className='min-h-screen min-w-screen bg-gray-100 flex items-center '>
     <div className="p-6 bg-white rounded-lg w-96 shadow-md max-w-md mx-auto my-8 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Scholarship</h2>
          
          {message.text && (
               <div className={`p-3 rounded-md mb-4 ${
                    message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
               }`}>
                    {message.text}
               </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                    <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
                         Student Roll Number
                    </label>
                    <input
                         ref={setFocus}
                         type="text"
                         id="rollNumber"
                         name="rollNumber"
                         value={formData.rollNumber}
                         onChange={handleChange}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         required
                    />
               </div>
               
               <div>
                    <label htmlFor="scholarshipAmount" className="block text-sm font-medium text-gray-700 mb-1">
                         Scholarship Amount
                    </label>
                    <input
                         type="number"
                         onKeyDown={(e) => {
                              if(e.key == "Enter"){
                                   e.preventDefault();
                                   document.getElementById("remarks").focus();
                              }
                         }}
                         id="scholarshipAmount"
                         name="scholarshipAmount"
                         value={formData.scholarshipAmount}
                         onChange={handleChange}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         required
                    />
               </div>
               
               <div>
                    <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                         Remarks
                    </label>
                    <textarea
                         onKeyDown={(e) => {
                              if(e.key == "Enter"){
                                   e.preventDefault();
                                   document.getElementById("submitBtn").focus();
                              }
                         }}
                         id="remarks"
                         name="remarks"
                         value={formData.remarks}
                         onChange={handleChange}
                         rows="3"
                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
               </div>
               
               <button
                    id='submitBtn'
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
               >
                    {isLoading ? 'Processing...' : 'Add Scholarship'}
               </button>
          </form>
     </div>
     </div>
)
}

export default AddScholarship
