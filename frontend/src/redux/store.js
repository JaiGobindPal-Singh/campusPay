import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/student/studentSlice'
import clerkReducer from './slices/clerk/clerkSlice'
import accountantReducer from './slices/accountant/accountantSlice'
import adminReducer from './slices/admin/adminSlice'
export const store = configureStore({
  reducer: {
    student: studentReducer,
    clerk: clerkReducer,
    accountant: accountantReducer,
    admin: adminReducer,
  },
})