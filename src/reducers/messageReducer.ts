/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { AppState, TMessage } from '../@types';

const initialState: AppState = {
  newMessage: '',
  author: '',
};

export const actionChangeMessage = createAction<TMessage>('CHANGE_MESSAGE');

const messageReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionChangeMessage, (state, action) => {
    state.newMessage = action.payload;
  });
});

export default messageReducer;
