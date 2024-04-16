import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logInToken: null
  },
  reducers: {
    LOGIN: (state, action) => {
      state.logInToken = action.payload
    },
    LOGOUT: (state) => {
      state.logInToken = null; // Clear the login token
      // Optionally, clear any other authentication-related state here
    },
  },
})

// Action creators are generated for each case reducer function
export const { LOGIN, LOGOUT } = authSlice.actions

export default authSlice.reducer