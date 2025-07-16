import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adminData: null,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAdminData } = adminSlice.actions

export default adminSlice.reducer