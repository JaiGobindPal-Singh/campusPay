import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import StudentPanel from "./pages/StudentPanel.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Loading from "./layouts/Loading.jsx"
import StudentPreviousTransactions from "./components/studentComponents/StudentPreviousTransactions.jsx"
import { useDispatch } from "react-redux"
import {  loadStudentData } from "./features/authentication/handleRefresh.js"
import { useEffect } from "react"
import { setStudentData } from "./redux/slices/student/studentSlice.js"
import { useState } from "react"


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
      // Set loading to false after data is loaded
      setIsLoading(false);
    }
    loadData();
  }, [dispatch])

  const currentStudentDetails = useSelector((state) => state.student.studentData);
  if (isloading) {
    return <Loading/>
  }
  return (
    <div>
      <Routes>
        <Route index element={
          currentStudentDetails ? <Navigate to="/student/panel" replace /> :
                  <Navigate to="/login/student" replace />
        } />
        <Route path="login/student" element={
          currentStudentDetails ? <Navigate to="/student/panel" replace /> :
                  <LoginPage />
        } />
        <Route path="student/" element={<Navigate to="/student/panel" replace />} />
        <Route path="student/panel" element={currentStudentDetails ? <StudentPanel /> : <Navigate to="/login/student" replace />} />
        <Route path="student/previousTransactions" element={currentStudentDetails ? <StudentPreviousTransactions/> : <Navigate to="/login/student" replace />} />


        {//* the below path is used to redirect any unknown path to the home page for the security of the app and provide the better user experience
        }
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
    </div>
  )
}

export default App
