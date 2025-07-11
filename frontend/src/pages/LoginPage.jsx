import { useParams } from "react-router-dom"
import { useState } from "react";
import { studentLogin, accountantLogin, clerkLogin, adminLogin } from "../features/authentication/handleLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStudentData } from "../redux/slices/student/studentSlice.js";
import { setAccountantData } from "../redux/slices/accountant/accountantSlice.js";
import { setClerkData } from "../redux/slices/clerk/clerkSlice.js";
import { setAdminData } from "../redux/slices/admin/adminSlice.js";
import Navbar from "../layouts/Navbar.jsx";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { userType } = useParams();
  userType = userType.trim(' ').toLowerCase();      //convert userType to lowercase and remove any leading or trailing spaces
  if (userType !== "student" && userType !== "accountant" && userType !== "clerk" && userType !== "admin") {
    userType = "student"; //default userType is student
  }
  //* rollNo and mobile are used for the login they contain the rollNumber and mobile if user is student or contains username and password if user is accountant, clerk or admin
  const [rollNo, setRollNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //* check if userType is student, accountant, clerk or admin and typecast the data accordingly
    let enteredData = {};
    if (userType === "student") {
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
    } else {
      enteredData = {
        username: rollNo,
        password: mobile
      }
    }
    //* call the respective login function based on userType
    try {
      if (userType === "student") {
        const studentData = await studentLogin(enteredData);
        if (studentData) {
          dispatch(setStudentData(studentData));
          navigate("/");
        } else {
          throw new Error("Login failed");
        }
      } else if (userType === "accountant") {
        const accountantData = await accountantLogin(enteredData);
        if (accountantData) {
          dispatch(setAccountantData(accountantData));
          navigate("/");
        } else {
          throw new Error("Login failed");
        }
      } else if (userType === "clerk") {
        const clerkData = await clerkLogin(enteredData);
        if (clerkData) {
          dispatch(setClerkData(clerkData));
          navigate("/");
        }
      } else if (userType === "admin") {
        const adminData = await adminLogin(enteredData);
        if (adminData) {
          dispatch(setAdminData(adminData));
          navigate("/");
        }
      }
    } catch (e) {
      alert("Login failed. Please check your credentials.");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Navbar loginUserType={userType} loginPage={true}/>
      <div className=" min-h-[45.3em] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {userType === "admin" ? "Admin Login" :
                userType === "student" ? "Student Login" :
                  userType === "accountant" ? "Accountant Login" :
                    userType === "clerk" ? "Clerk Login" :
                      "Login"}
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
                  value={rollNo}
                  onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                      e.preventDefault();
                      document.getElementById('mobile').focus();
                    }
                  }}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder={userType == "student" ? "Roll Number" : "Username"} />
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">mobile</label>
                <input id="mobile" name="mobile" type="mobile" required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder={userType == "student" ? "Mobile" : "password"} />
              </div>
            </div>
            {/* submit button  */}
            <div>
              <button type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
