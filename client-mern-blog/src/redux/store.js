import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postSlice from './features/post/postSlice'
import applySlice from './features/apply/applySlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        apply: applySlice,
    },
})
