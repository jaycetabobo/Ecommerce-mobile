import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Screen/Authentication/reducer/authSlice'
import cartSlice from './Screen/Content/reducer/cartSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice
  },
})