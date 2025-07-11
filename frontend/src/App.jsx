import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import StudentPanel from "./pages/StudentPanel.jsx"
import AccountantPanel from "./pages/AccountantPanel.jsx"
import AdminPanel from "./pages/AdminPanel.jsx"
import ClerkPanel from "./pages/ClerkPanel.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Loading from "./layouts/Loading.jsx"
import StudentPreviousTransactions from "./components/studentComponents/StudentPreviousTransactions.jsx"
import { useDispatch } from "react-redux"
import { loadAccountantData, loadStudentData, loadAdminData, loadClerkData } from "./features/authentication/handleRefresh.js"
import { useEffect } from "react"
import { setStudentData } from "./redux/slices/student/studentSlice.js"
import { useState } from "react"
import { setAccountantData } from "./redux/slices/accountant/accountantSlice.js"
import { setAdminData } from "./redux/slices/admin/adminSlice.js"
import { setClerkData } from "./redux/slices/clerk/clerkSlice.js"

const App = () => {
  const [isloading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    //function to load data for all user types in case of refresh or relogin
    const loadData = async () => {
      try {
        const studentDetails = await loadStudentData();
        if (studentDetails) {
          dispatch(setStudentData(studentDetails));
        }
      } catch (e) {
        console.warn("Error loading student data:", e);
      }
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

  const currentStudentDetails = useSelector((state) => state.student.studentData);
  const currentAccountantDetails = useSelector((state) => state.accountant.accountantData);
  const currentAdminDetails = useSelector((state) => state.admin.adminData);
  const currentClerkDetails = useSelector((state) => state.clerk.clerkData);
  if (isloading) {
    return <Loading/>
  }
  return (
    <div>
      <Routes>
        <Route index element={
          currentStudentDetails ? <Navigate to="/student/panel" replace /> :
            currentAccountantDetails ? <Navigate to="/accountant/panel" replace /> :
              currentAdminDetails ? <Navigate to="/admin/panel" replace /> :
                currentClerkDetails ? <Navigate to="/clerk/panel" replace /> :
                  <Navigate to="/login/student" replace />
        } />
        <Route path="login/:userType" element={
          currentStudentDetails ? <Navigate to="/student/panel" replace /> :
            currentAccountantDetails ? <Navigate to="/accountant/panel" replace /> :
              currentAdminDetails ? <Navigate to="/admin/panel" replace /> :
                currentClerkDetails ? <Navigate to="/clerk/panel" replace /> :
                  <LoginPage />
        } />
        <Route path="student/" element={<Navigate to="/student/panel" replace />} />
        <Route path="student/panel" element={currentStudentDetails ? <StudentPanel /> : <Navigate to="/login/student" replace />} />
        <Route path="student/previousTransactions" element={currentStudentDetails ? <StudentPreviousTransactions/> : <Navigate to="/login/student" replace />} />


        <Route path="accountant/" element={<Navigate to="/accountant/panel" replace />} />
        <Route path="accountant/panel" element={currentAccountantDetails ? <AccountantPanel /> : <Navigate to="/login/accountant" replace />} />

        <Route path="admin/" element={<Navigate to="/admin/panel" replace />} />
        <Route path="admin/panel" element={currentAdminDetails ? <AdminPanel /> : <Navigate to="/login/admin" replace />} />

        <Route path="clerk/" element={<Navigate to="/clerk/panel" replace />} />
        <Route path="clerk/panel" element={currentClerkDetails ? <ClerkPanel /> : <Navigate to="/login/clerk" replace />} />


        {//* the below path is used to redirect any unknown path to the home page for the security of the app and provide the better user experience
        }
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
    </div>
  )
}

export default App
