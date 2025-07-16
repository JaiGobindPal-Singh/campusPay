import { configureStore } from '@reduxjs/toolkit'
import clerkReducer from './slices/clerk/clerkSlice'
import accountantReducer from "./slices/accountant/accountantSlice"
import adminReducer from './slices/admin/adminSlice'
export const store = configureStore({
     reducer: {
          clerk: clerkReducer,
          accountant: accountantReducer,
          admin: adminReducer,
     },
})