/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { IMessage } from '../@types/chat';

interface ChatState {
  messages: IMessage[];
  newMessageContent: string;
}

// ----- STATE INITIAL -----
const initialState: ChatState = {
  // on stocke la liste des messages = un tableau d'objets
  messages: [],
  // on stocke la valeur de l'input du form
  newMessageContent: '',
};

// ----- ACTION CREATORS -----
// action dispatchée au moement ou un user tape une lettre dans l'input du composant Form
export const actionChangeNewMessageContent = createAction<string>(
  'chat/CHANGE_NEW_MESSAGE_VALUE'
);
// action dispatché au moment ou le user valide le formulaire d'ajout de message
// quand on execute l'action creator on reçoit une action
// { type: 'chat/ADD_MESSAGE' }
// cet action creator va prendre en payload le message de type IMessage
export const actionAddMessage = createAction<IMessage>('chat/ADD_MESSAGE');

// ----- REDUCER -----
const chatReducer = createReducer(initialState, (builder) => {
  // ici viendront les addCase des potentielles actions qui seront dispatchée ..
  builder
    .addCase(actionChangeNewMessageContent, (state, action) => {
      // modif de la valeur de l'input
      state.newMessageContent = action.payload;
    })
    .addCase(actionAddMessage, (state, action) => {
      // recuperer le message qui vient du back qui a été envoyé par le serveur websocket dans le payload de l'action addMessage

      // ajout à la suite des message existants dans le state
      state.messages.push(action.payload);

      // on peut en profiter pour vider la valeur de l'input : vu que l'input est controlé dans le state de redux le reducer peut le faire direct
      // state.newMessageContent = '';

      /*
      si on était pas avec toolkit on n'aurai pas le droit de fair eun push sur une partie du state, il faudrait renvoyer un nouvel objet state
      const newState = {
        ...state,
        messages: [...state.messages, newMessage],
        newMessageContent: '',
      };
      */
    });
});

export default chatReducer;
