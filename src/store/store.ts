// si on a pas toolkit on utilise non pas configureStore mais createStore de redux on devra alors utiliser combineReducer si on veut plusieurs reducers
// et on devra aussi utiliser un combineEnhancer pour specifier nos middlewares et les dev tools
import { configureStore } from '@reduxjs/toolkit';

// on importe les reducers
import chatReducer from '../reducers/chatReducer';
import settingsReducer from '../reducers/settingsReducer';

const store = configureStore({
  reducer: {
    // nomDuTiroir: nomDuReducer
    chat: chatReducer, // Je renseigne mon reducer
    settings: settingsReducer, // si on ajoute un reducer à chaque dispatch il recevra les actions
    // ici potentielement on pourra mettre d'autres reducers
  },
});

/*
version avec un seul reducer
const store = configureStore({
  reducer: settingsReducer,
});
*/

// ici on copie colle les lignes de la doc : https://react-redux.js.org/using-react-redux/usage-with-typescript

// on recupère le type du state et de la fonction dispatch depuis le store directement
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
