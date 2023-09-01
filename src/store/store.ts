import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../reducers/chatReducer';

const store = configureStore({
  reducer: {
    chat: chatReducer, // Je renseigne mon reducer
    // ici potentielement on pourra mettre d'autres reducers
  },
});

// ici on copie colle les lignes de la doc : https://react-redux.js.org/using-react-redux/usage-with-typescript

// on recupère le type du state et de la fonction dispatch depuis le store directement
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
