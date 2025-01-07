import {combineReducers, configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: combineReducers({})
});

// Types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
