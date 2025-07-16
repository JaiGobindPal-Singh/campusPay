import Navbar from "../layouts/Navbar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const AccountantPanel = () => {
  const  currentAccountantDetails  = useSelector((state) => state.accountant.accountantData)
  const Navigate = useNavigate();
  return (
    <>
      <Navbar loggedIn={true}/>
      <div className="bg-gray-100 min-h-[45.6rem] p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">Accountant Dashboard</h1>

          {/* Accountant Details Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accountant Profile</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {/* This would display accountant details from Redux store */}
              <p className="text-gray-700"><span className="font-semibold">Name:</span> {currentAccountantDetails.fullname}</p>
              <p className="text-gray-700"><span className="font-semibold">Username:</span> {currentAccountantDetails.username}</p>
              <p className="text-gray-700"><span className="font-semibold">Mobile:</span> {currentAccountantDetails.mobile}</p>
            </div>
          </div>

          {/* Operations Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={()=>{Navigate("../accountant/pay-student-fees")}}>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Pay Student Fees</h3>
                <p className="text-gray-600">Process fee payments for students</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={()=>{Navigate("../accountant/show-student-details")}}>
                <h3 className="text-xl font-semibold text-green-700 mb-2">Get Student Details</h3>
                <p className="text-gray-600">View student financial information</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={()=>{Navigate("../accountant/addScholarship")}}>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">Add Scholarship</h3>
                <p className="text-gray-600">Register new scholarship for students</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={()=>{Navigate("../accountant/addFine")}}>
                <h3 className="text-xl font-semibold text-red-700 mb-2">Add Fine</h3>
                <p className="text-gray-600">Apply penalties or additional charges</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-amber-700 mb-2">Transaction History</h3>
                <p className="text-gray-600">View previous financial transactions</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-teal-700 mb-2">Generate Reports</h3>
                <p className="text-gray-600">Create financial reports and summaries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountantPanel
