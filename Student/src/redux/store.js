import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/student/studentSlice'
export const store = configureStore({
  reducer: {
    student: studentReducer,
  },
})