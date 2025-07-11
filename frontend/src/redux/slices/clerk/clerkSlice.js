import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clerkData: null,
}

export const clerkSlice = createSlice({
  name: 'clerk',
  initialState,
  reducers: {
    setClerkData: (state, action) => {
      state.clerkData = action.payload;
    },
  },

})

// Action creators are generated for each case reducer function
export const { setClerkData} = clerkSlice.actions

export default clerkSlice.reducer