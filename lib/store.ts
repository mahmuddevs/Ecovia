import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/lib/features/authSlice/authSlice'
import eventReducer from '@/lib/features/eventSlice/eventSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            events: eventReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']