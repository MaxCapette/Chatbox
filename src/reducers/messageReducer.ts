/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { AppState, TMessage, IMessage } from '../@types';

const initialState: AppState = {
  newMessage: '',
  author: '',
  messages: [
    {
      id: 1,
      author: 'Super Chat',
      content: 'Salut',
    },
    {
      id: 2,
      author: 'Super Chat',
      content: 'Comment chat va ?',
    },
    {
      id: 3,
      author: 'Super Chat',
      content: "T'as pas des super croquettes ?",
    },
  ],
};

export const actionChangeMessage = createAction<TMessage>('CHANGE_MESSAGE');
export const actionSendMessage = createAction<IMessage>('SEND_MESSAGE');

const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeMessage, (state, action) => {
      state.newMessage = action.payload;
    })
    .addCase(actionSendMessage, (state, action) => {
      state.messages.push(action.payload);
    });
});

export default messageReducer;

// // Define the reducers for the chatbox
// const messageReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_MESSAGE':
//       return {
//         ...state,
//         messages: [...state.messages, action.payload],
//       };
//     case 'CHANGE_MESSAGE':
//       return {
//         ...state,
//         newMessage: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// const store = createStore(combineReducers({ message: messageReducer }));
