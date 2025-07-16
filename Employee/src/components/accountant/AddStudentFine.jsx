import { useState} from "react"
import axiosInstance from "../../utils/axios.js";
const AddStudentFine = () => {
  const [rollNo, setrollNo] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [fine, setFine] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handlerollNoChange = (e) => {
    setrollNo(e.target.value);
  };

  const handleFineChange = (e) => {
    setFine(e.target.value);
  };

  const searchStudent = async () => {
    if (!rollNo) return;
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await axiosInstance.post('/accountant/studentdetails', { rollNo: rollNo });
      if (!response) {
        throw new Error('Student not found');
      }
      const data = response.data.student;
      setStudentDetails(data);
    } catch (err) {
      setError(err.message);
      setStudentDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const addFine = async (e) => {
    e.preventDefault();
    
    if (!studentDetails || !fine) {
      setError("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await axiosInstance.post('/accountant/addfine', {
        rollNo: studentDetails.rollNo,
        fineAmount: fine,
      });
      
      if (!response) {
        throw new Error('Failed to add fine');
      }
      setSuccess(true);
      setFine("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Add Student Fine</h2>
      
      <div className="mb-6 bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                document.getElementById("searchButton").click();
              }}}
            type="text"
            value={rollNo}
            onChange={handlerollNoChange}
            placeholder="Enter Roll Number"
            className="border rounded-md p-2 w-full md:flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            id="searchButton"
            onClick={()=>{
              searchStudent();
              document.getElementById("fine")?.focus();
            }}
            disabled={loading || !rollNo}
            className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800 disabled:bg-gray-300 w-full md:w-auto mt-2 md:mt-0 transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {loading && <p className="text-center py-2 text-gray-600">Loading...</p>}
        {error && <p className="text-red-500 p-2 bg-red-50 rounded-md text-center">{error}</p>}
        
        {studentDetails && (
          <div className="border p-4 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="font-bold text-lg border-b pb-2 mb-3">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p><span className="font-semibold">Name:</span> {studentDetails.name}</p>
              <p><span className="font-semibold">Roll Number:</span> {studentDetails.rollNo}</p>
              <p><span className="font-semibold">Class:</span> {studentDetails.degree}</p>
            </div>
            
            <form onSubmit={addFine} className="mt-6">
              <div className="mb-4">
                <label htmlFor="fine" className="block mb-1 font-medium">Fine Amount (₹)</label>
                <input
                  id="fine"
                  type="number"
                  value={fine}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && fine && fine > 0) {
                      e.preventDefault();
                      document.getElementById("addFineButton").click();
                    }}}
                  onChange={handleFineChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {fine && fine <= 0 && (
                  <p className="text-red-500 text-sm mt-1">Fine amount must be greater than 0</p>
                )}
              </div>
              <button
                id="addFineButton"
                type="submit"
                disabled={loading || !fine || fine <= 0}
                className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800 disabled:bg-gray-400 w-full sm:w-auto transition-colors"
              >
                {loading ? 'Processing...' : 'Add Fine'}
              </button>
            </form>
          </div>
        )}
        
        {success && (
          <div className="mt-4 p-3 bg-indigo-100 text-indigo-700 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>        
            Fine added successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default AddStudentFine
