/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { actionCheckLogin } from '../middlewares/settingsMiddleware';

const initialState = {
  // email et password sont les valeurs des inputs du bloc settings
  // ces 2 données permettent de controller les input
  email: '',
  password: '',
  pseudo: null,
  isConnected: false,
  errorMessage: null,
};

// ----- ACTION CREATORS -----
// action dispatchée quand un utilisateur tape dans l'input email ou password
interface IactionSetInputPayload {
  value: string; // valeur tapée dans l'input par l'utilisateur
  inputName: 'email' | 'password'; // le nom de la valeur à modifier dans le state de redux (soit email soit password)
}
export const getActionSetInput =
  createAction<IactionSetInputPayload>('settings/SET_INPUT');

// action dispatchée au click sur le bouton de deconnexion
export const getActionDisconnect = createAction('settings/DISCONNECT');

// ----- REDUCER -----
const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getActionSetInput, (state, action) => {
      // comment savoir quel valeur je dois modifier , email ou password ?
      // j'ai le nom de l'input dans le payload de l'action
      state[action.payload.inputName] = action.payload.value;
    })
    .addCase(actionCheckLogin.fulfilled, (state, action) => {
      // on va ajouter un case pour checklogin.fullfilled qui va enregistrer le pseudo dans le state (on ne peux pas mettre de case pour juste actionCheckLogin puisque c'est asynchrone)
      state.pseudo = action.payload;
      state.isConnected = true;
    })
    .addCase(getActionDisconnect, (state, action) => {
      // cette action arrive dans le reducer quand elle est dispatché au click sur le bouton deconnexion : on met alors isConnected à false
      state.isConnected = false;
      state.pseudo = null;
      state.errorMessage = null;
    })
    // un autre case dans le cas ou on reçoit checklogin rejected pour enregistrer un message d'erreur dans le state
    .addCase(actionCheckLogin.rejected, (state, action) => {
      // cette action arrive dans le reducer quand elle est dispatché au click sur le bouton deconnexion : on met alors isConnected à false
      state.errorMessage = 'WRONG! Try again';
    });
  // un autre case dans le cas ou on reçoit pending pour mettre un isLoading à true et afficher un loader
  // l'affichage du pseudo, un message de bienvenue ...
});

export default settingsReducer;
