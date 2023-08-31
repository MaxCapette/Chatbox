import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../reducers/messageReducer';

const store = configureStore({
  reducer: messageReducer,
  // ici potentiels autres reducers...
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
