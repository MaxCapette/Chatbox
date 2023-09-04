import { createAction, createReducer } from '@reduxjs/toolkit';

// Définir l'état initial de la modale
interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

// Créer les actions pour gérer la modale
export const showModal = createAction<{ modalType: string }>('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');

// Créer le reducer pour gérer les actions de la modale
const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showModal, (state) => {
      state.isOpen = true;
    })
    .addCase(hideModal, (state) => {
      state.isOpen = false;
    });
});

export default modalReducer;
