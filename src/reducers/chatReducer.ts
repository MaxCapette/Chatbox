import { createAction, createReducer } from '@reduxjs/toolkit';
import { IMessage } from '../@types/chat';

interface ChatState {
  messages: IMessage[];
  newMessageContent: string;
}

// ----- STATE INITIAL -----
const initialState: ChatState = {
  // on stocke la liste des messages = un tableau d'objets
  messages: [
    {
      id: 1,
      author: 'Super Toutou',
      content: 'Salut',
    },
    {
      id: 2,
      author: 'Super Toutou',
      content: 'Comment chat va ?',
    },
    {
      id: 3,
      author: 'Super Toutou',
      content: "T'as pas des super croquettes ?",
    },
  ],
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
      // ajout à la suite des message existants dans le state
      state.messages.push(newMessage);
      // on peut en profiter pour vider la valeur de l'input : vu que l'input est controlé dans le state de redux le reducer peut le faire direct
      state.newMessageContent = '';

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
