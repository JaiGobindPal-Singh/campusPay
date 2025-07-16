import { useState } from "react";
import { NavLink } from "react-router-dom"
import { logout } from "../features/authentication/handleLogin";

const Navbar = (props) => {
     const { loginPage, loginUserType } = props;
     const { loggedIn } = props;
     const [isHidden, setIsHidden] = useState(true);
     const handleLogout = () => {
          logout();
          window.location.reload();
     }

     return (
          <div>
               <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-8 py-3">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                         {/* Logo/Brand */}
                         <div className="flex-shrink-0">
                              <h1 className="text-2xl font-bold text-blue-600">Campus Pay</h1>
                         </div>
                         {/* Desktop Navigation */}
                         <div className="hidden md:block">
                              {/* login options  */}
                              <div className={"loginItems ml-10 flex items-center space-x-4" + (loginPage ? "" : " hidden")}>
                                   {loginUserType != "admin" && <NavLink to={'../login/admin'} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Admin</NavLink>}
                                   {loginUserType != "clerk" && <NavLink to={'../login/clerk'} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Clerk</NavLink>}
                                   {loginUserType != "accountant" && <NavLink to={'../login/accountant'} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Accountant</NavLink>}
                              </div>
                              {/* loggedIn Options*/}
                              <div className={"studentItems ml-10 flex items-center space-x-4" + (loggedIn ? "" : " hidden")}>
                                   <button
                                        onClick={handleLogout}
                                        className="text-white hover:text-blue-600 px-3 py-2 rounded-md font-medium bg-indigo-600">Logout</button>
                              </div>
                         </div>
                         {/* Hamburger Menu for Mobile */}
                         <div id="hamburger" className="md:hidden flex items-center">
                              <button
                                   onClick={() => setIsHidden(!isHidden)}
                                   className="text-gray-500 hover:text-blue-600 focus:outline-none">
                                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                   </svg>
                              </button>
                         </div>
                    </div>
                    {/* Mobile Menu (hidden by default) */}
                    <div className={"md:hidden " + (isHidden ? "hidden" : "")}>
                         {/* login options for mobile  */}
                         <div className={"flex flex-col min-w-30 absolute bg-indigo-700 right-5 rounded text-white px-2 pt-2 pb-3 space-y-1 sm:px-3" + (loginPage ? "" : " hidden")}>
                              {loginUserType != "admin" && <NavLink to={'../login/admin'} className=" hover:text-blue-600 px-3 py-2 rounded-md font-medium">Admin</NavLink>}
                              {loginUserType != "clerk" && <NavLink to={'../login/clerk'} className=" hover:text-blue-600 px-3 py-2 rounded-md font-medium">Clerk</NavLink>}
                              {loginUserType != "accountant" && <NavLink to={'../login/accountant'} className=" hover:text-blue-600 px-3 py-2 rounded-md font-medium">Accountant</NavLink>}
                         </div>

                         {/* student options for mobile  */}
                         <div className={"flex flex-col min-w-30 absolute bg-indigo-700/95 right-5 rounded text-white px-2 pt-2 pb-3 space-y-1 sm:px-3" + (loggedIn ? "" : " hidden")}>
                              <button
                                   onClick={handleLogout}
                                   className=" hover:text-blue-600 px-3 py-2 rounded-md font-medium">Logout</button>
                         </div>
                    </div>
               </nav>
          </div>
     )
}

export default Navbar
