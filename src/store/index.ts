import { configureStore } from '@reduxjs/toolkit';
import analysisReducer from './slices/analysisSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
