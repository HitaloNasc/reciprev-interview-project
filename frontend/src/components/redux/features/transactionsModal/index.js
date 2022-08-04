import { createAction, createReducer } from '@reduxjs/toolkit';

const initialSatate = {
  isOpened: false,
  data: {},
  type: null,
};

export const openModal = createAction('TRANSACTIONS_MODAL_OPEN');
export const closeModal = createAction('TRANSACTIONS_MODAL_CLOSE');

export default createReducer(initialSatate, {
  [openModal.type]: (state, action) => {
    const { type, data } = action.payload;
    return {
      ...state,
      data,
      type,
      isOpened: true,
    };
  },
  // eslint-disable-next-line no-unused-vars
  [closeModal.type]: (state, action) => {
    return { ...initialSatate };
  },
});

export const ACTION = {
  CREATE: 1,
  UPDATE: 2,
};
