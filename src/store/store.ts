import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../reducers/chatReducer';
import modalReducer from '../reducers/modalReducer';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
