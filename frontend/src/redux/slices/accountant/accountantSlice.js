import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accountantData: null,
}

export const accountantSlice = createSlice({
  name: 'accountant',
  initialState,
  reducers: {
    setAccountantData: (state, action) => {
      state.accountantData = action.payload;
    },
  },

})

// Action creators are generated for each case reducer function
export const { setAccountantData } = accountantSlice.actions

export default accountantSlice.reducer