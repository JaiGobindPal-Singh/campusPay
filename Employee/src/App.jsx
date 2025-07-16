import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import LoginPage from "./pages/LoginPage.jsx"
import Loading from "./layouts/Loading.jsx"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { loadAccountantData, loadAdminData, loadClerkData } from "./features/authentication/handleRefresh.js"
import { setAccountantData } from "./redux/slices/accountant/accountantSlice.js"
import { setAdminData } from "./redux/slices/admin/adminSlice.js"
import { setClerkData } from "./redux/slices/clerk/clerkSlice.js"
import AccountantPanel from "./pages/AccountantPanel.jsx"
import ClerkPanel from "./pages/ClerkPanel.jsx"
import AdminPanel from "./pages/AdminPanel.jsx"
import PayStudentFees from "./components/accountant/payStudentFees.jsx"
import ShowStudentDetails from "./components/accountant/ShowStudentDetails.jsx"
import AddScholarship from "./components/accountant/AddScholarship.jsx"
import AddStudentFine from "./components/accountant/AddStudentFine.jsx"

const App = () => {
     const [isloading, setIsLoading] = useState(true);
     const dispatch = useDispatch();
     useEffect(() => {
          //function to load data for all user types in case of refresh or relogin
          const loadData = async () => {
               //load the data for each user type and store in the redux if already logged in 
               try {
                    const accountantDetails = await loadAccountantData();
                    if (accountantDetails) {
                         dispatch(setAccountantData(accountantDetails));
                    }
               } catch (e) {
                    console.warn("Error loading accountant data:", e);
               }
               try {
                    const adminDetails = await loadAdminData();
                    if (adminDetails) {
                         dispatch(setAdminData(adminDetails));
                    }
               } catch (e) {
                    console.warn("Error loading admin data:", e);
               }
               try {
                    const clerkDetails = await loadClerkData();
                    if (clerkDetails) {
                         dispatch(setClerkData(clerkDetails));
                    }
               } catch (e) {
                    console.warn("Error loading clerk data:", e);
               }


               // Set loading to false after data is loaded
               setIsLoading(false);
          }
          loadData();
     }, [dispatch])

     // Get the current user details from the redux store
     const currentAccountantDetails = useSelector((state) => state.accountant.accountantData);
     const currentAdminDetails = useSelector((state) => state.admin.adminData);
     const currentClerkDetails = useSelector((state) => state.clerk.clerkData);
     if (isloading) {
          return <Loading />
     }
     return (
          <div>
               <Routes>
                    <Route path="/" element={
                         currentAccountantDetails ? <Navigate to={"/accountant"} /> :
                              currentAdminDetails ? <Navigate to={"/admin"} /> :
                                   currentClerkDetails ? <Navigate to={"/clerk"} /> :
                                        <Navigate to={"/login/accountant"} />
                    } />
                    {/* accountant routes*/}
                    <Route path="/accountant" element={currentAccountantDetails ? <AccountantPanel /> : <Navigate to={"/login/accountant"} />} />
                    <Route path="accountant/pay-student-fees" element={currentAccountantDetails ? <PayStudentFees /> : <Navigate to={"/login/accountant"} />} />
                    <Route path="accountant/show-student-details" element={currentAccountantDetails ? <ShowStudentDetails /> : <Navigate to={"/login/accountant"} />} />
                    <Route path="accountant/addScholarship" element={currentAccountantDetails ? <AddScholarship /> : <Navigate to={"/login/accountant"} />} />
                    <Route path="accountant/addFine" element={currentAccountantDetails ? <AddStudentFine /> : <Navigate to={"/login/accountant"} />} />

                    <Route path="/admin" element={currentAdminDetails ? <AdminPanel /> : <Navigate to={"/login/admin"} />} />
                    <Route path="/clerk" element={currentClerkDetails ? <ClerkPanel /> : <Navigate to={"/login/clerk"} />} />
                    <Route path="/login/:userType" element={<LoginPage />} />
                    {//* the below path is used to redirect any unknown path to the home page for the security of the app and provide the better user experience
                    }
                    <Route path="*" element={<Navigate to={"/"} />} />
               </Routes>
          </div>
     )
}

export default App
