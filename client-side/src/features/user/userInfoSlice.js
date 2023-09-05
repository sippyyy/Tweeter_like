import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        base_info: {},
    },
    reducers: {
        getBaseInfo: (state, action) => {
            state.base_info= jwt_decode(action.payload)
        }
    }
})

// Action creators are generated for each case reducer function
export const { getBaseInfo } = userInfoSlice.actions

export default userInfoSlice.reducer