import { useState } from "react";
import { studentLogin } from "../features/authentication/handleLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStudentData } from "../redux/slices/student/studentSlice.js";
import Navbar from "../layouts/Navbar.jsx";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //* rollNo and mobile are used for the login 
  const [rollNo, setRollNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //* function to handle the login form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let enteredData = {};
    //convert rollNo and mobile to number type and check if they are valid in case of student login
    setRollNo(Number(rollNo));
    setMobile(Number(mobile));
    if (isNaN(rollNo) || isNaN(mobile)) {
      setIsLoading(false);
      alert("Please enter valid roll number and mobile number");
      return;
    }
    enteredData = {
      rollNo: rollNo,
      mobile: mobile
    }
    //* call the login function
    try {
      const studentData = await studentLogin(enteredData);
      if (studentData) {
        dispatch(setStudentData(studentData));
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (e) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className=" min-h-[45.3em] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Student Login
            </h2>
          </div>

          {/* login form  */}
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            {/* input fields  */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="rollNo" className="sr-only">Roll Number</label>
                <input id="rollNo" name="rollNo" required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type="number"
                  value={rollNo}
                  onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                      e.preventDefault();
                      document.getElementById('mobile').focus();
                    }
                  }}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder={"Roll No"} />
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">mobile</label>
                <input id="mobile" name="mobile" type="number" required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder={"Mobile"} />
              </div>
            </div>
            {/* submit button  */}
            <div>
              <button type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Sign in"}    
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
