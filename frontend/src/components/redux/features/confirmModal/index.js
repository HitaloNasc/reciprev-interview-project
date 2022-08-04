import { createAction, createReducer } from '@reduxjs/toolkit';

const initialSatate = {
  isOpened: false,
  payload: null,
};

export const openConfirmModal = createAction('CONFIRM_MODAL_OPEN');
export const closeConfirmModal = createAction('CONFIRM_MODAL_CLOSE');

export default createReducer(initialSatate, {
  [openConfirmModal.type]: (state, action) => {
    return {
      ...state,
      payload: action.payload,
      isOpened: true,
    };
  },
  // eslint-disable-next-line no-unused-vars
  [closeConfirmModal.type]: (state, action) => {
    return { ...initialSatate };
  },
});
