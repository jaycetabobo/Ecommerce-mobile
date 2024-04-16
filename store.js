import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Screen/Authentication/reducer/authSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
  },
})