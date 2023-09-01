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
  'CHANGE_NEW_MESSAGE_VALUE'
);
// action dispatché au moement ou le user valide le formulaire d'ajout de message
export const actionAddMessage = createAction('ADD_MESSAGE');

// ----- REDUCER -----
const chatReducer = createReducer(initialState, (builder) => {
  // ici viendront les addCase des potentielles actions qui seront dispatchée ..
  builder
    .addCase(actionChangeNewMessageContent, (state, action) => {
      // modif de la valeur de l'input
      state.newMessageContent = action.payload;
    })
    .addCase(actionAddMessage, (state, action) => {
      // creation du nouvel objet message
      const newMessage = {
        id: 99, // tous les id sont 99, ce n'est pas grave plus tard ils seront créés par le back : faudrait faire une fonction qui genere un id unique qui n'existe pas encore dans la liste du state.
        author: 'super Toutou',
        content: state.newMessageContent, // on a accès aux infos du state
      };

      state.messages.push(newMessage);
      state.newMessageContent = '';
    });
});

export default chatReducer;
