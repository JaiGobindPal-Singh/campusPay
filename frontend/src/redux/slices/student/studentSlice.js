import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentData: null,
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentData: (state, action) => {
      state.studentData = action.payload
    },
  },

})

// Action creators are generated for each case reducer function
export const { setStudentData } = studentSlice.actions

export default studentSlice.reducer