import { useParams } from "react-router-dom"
import { useState } from "react";
import { accountantLogin, clerkLogin, adminLogin } from "../features/authentication/handleLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccountantData } from "../redux/slices/accountant/accountantSlice.js";
import { setClerkData } from "../redux/slices/clerk/clerkSlice.js";
import { setAdminData } from "../redux/slices/admin/adminSlice.js";
import Navbar from "../layouts/Navbar.jsx";

const LoginPage = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     let { userType } = useParams();
     userType = userType.trim(' ').toLowerCase();      //convert userType to lowercase and remove any leading or trailing spaces
     if (userType !== "accountant" && userType !== "clerk" && userType !== "admin") {
          userType = "accountant";    //default userType is accountant if the userType is not valid
     }
     //* Username and Password are used for the login
     const [Username, setUsername] = useState("");
     const [Password, setPassword] = useState("");
     const [isLoading, setIsLoading] = useState(false);

     const submitHandler = async (e) => {
          e.preventDefault();
          setIsLoading(true);
          
          const enteredData = {
               username : Username,
               password : Password,
          };
          //* call the respective login function based on userType
          try {
               if (userType === "accountant") {
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
               <Navbar loginUserType={userType} loginPage={true} />
               <div className=" min-h-[45.3em] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
                    <div className="max-w-md w-full space-y-8">
                         <div>
                              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                   {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
                              </h2>
                         </div>

                         {/* login form  */}
                         <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                              {/* input fields  */}
                              <div className="rounded-md shadow-sm -space-y-px">
                                   <div>
                                        <label htmlFor="Username" className="sr-only">Username</label>
                                        <input id="Username" name="Username" required
                                             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                             value={Username}
                                             onKeyDown={(e) => {  // handle Enter key press to focus on Password field
                                                  if (e.key == 'Enter') {
                                                       e.preventDefault();
                                                       document.getElementById('Password').focus();
                                                  }
                                             }}
                                             onChange={(e) => setUsername(e.target.value)}
                                             placeholder={"Username"} />
                                   </div>
                                   <div>
                                        <label htmlFor="Password" className="sr-only">Password</label>
                                        <input id="Password" name="Password" type="text" required
                                             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                             value={Password}
                                             onChange={(e) => setPassword(e.target.value)}
                                             placeholder={"Password"} />
                                   </div>
                              </div>
                              {/* submit button  */}
                              <div>
                                   <button type="submit"
                                        disabled={isLoading}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {/* show the loading animation while logging in and disable button */}
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
