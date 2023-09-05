import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer  from '../features/user/userInfoSlice'
export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer
  },
})