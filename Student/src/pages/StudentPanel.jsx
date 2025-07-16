import Navbar from "../layouts/Navbar";
import { useSelector } from "react-redux";
import Razorpay from "../features/onlinePayment/razorpay/Razorpay";
import { useState } from "react";

const StudentPanel = () => {
  const student = useSelector((state) => state.student.studentData);
  const [showPayFeesComponent, setShowPayFeesComponent] = useState(false)

  //*reder the pay fees page if pay fees button is clicked
  if (showPayFeesComponent) {
    return <Razorpay student={student} setShowPayFeesComponent={setShowPayFeesComponent} />
  }

  return (
    <>
      <Navbar studentPage={true} />
      <div className="max-w-2xl mx-auto mt-8 px-4">

        {/* student personal details */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-indigo-200">
          <div className="rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-3 text-indigo-700">Personal Information</h2>
              <p className="mb-2"><span className="font-bold text-indigo-700">Name:</span> {student.name}</p>
              <p className="mb-2"><span className="font-bold text-indigo-700">Mobile:</span> {student.mobile}</p>
              <p className="mb-2"><span className="font-bold text-indigo-700">Class</span> {student.class}</p>
              <p className="mb-2"><span className="font-bold text-indigo-700">Roll Number:</span> {student.rollNo}</p>
            </div>
          </div>
        </div>

        {/* student financial details */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-indigo-200">
          <div className="rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-3 text-indigo-700">Financial Status</h2>
              <p className="mb-2"><span className="font-bold text-indigo-700">Pending Fees:</span> ₹{student.pendingFees}</p>
              <p className="mb-2"><span className="font-bold text-indigo-700">Fine:</span> ₹{student.fine}</p>
              <p className="text-xl mt-4 mb-4">
                <span className="font-bold text-indigo-700">Total Due:</span> ₹{student.pendingFees + student.fine}
              </p>

              {/* pay fees button */}
              <button
                onClick={() => setShowPayFeesComponent(true)}
                className={`px-4 py-2 rounded font-medium ${student.pendingFees + student.fine <= 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-indigo-700 hover:bg-indigo-800 text-white'
                  }`}
                disabled={student.pendingFees + student.fine <= 0}
              >
                Pay Fees
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPanel
