import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';
import uiReducer from './uiSlice';

//configureStore automatically enables Redux DevTools in development
export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        ui: uiReducer,
    },
});

export default store;