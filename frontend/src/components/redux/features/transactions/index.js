import { createAction, createReducer } from '@reduxjs/toolkit';

const initialSatate = {
  loadedData: [],
  filter: {
    term: '',
    data: [],
  },
};

export const listTransactions = createAction('LIST_TRANSACTIONS');
export const addTransactions = createAction('CREATE_TRANSACTIONS');
export const attTransactions = createAction('UPDATE_TRANSACTIONS');
export const deleteTransactions = createAction('DELETE_TRANSACTIONS');

export default createReducer(initialSatate, {
  [listTransactions.type]: (state, action) => {
    const data = [...action.payload];
    return {
      ...state,
      loadedData: [...data],
      filter: {
        ...state.filter,
        data,
      },
    };
  },
  [addTransactions.type]: (state, action) => {
    const newRow = action.payload;
    const loadedData = [...state.loadedData, newRow];
    return {
      ...state,
      loadedData,
      filter: {
        ...state.filter,
        data: loadedData,
      },
    };
  },
  [attTransactions.type]: (state, action) => {
    const loadedData = state.loadedData.map((row) => {
      if (action.payload) {
        if (action.payload.id) {
          return row.id === action.payload.id ? action.payload : row;
        }
      }
    });

    return {
      ...state,
      loadedData,
      filter: {
        ...state.filter,
        data: loadedData,
      },
    };
  },
  [deleteTransactions.type]: (state, action) => {
    const loadedData = [
      ...state.loadedData.filter((row) => (row ? row.id !== action.payload.id : false)),
    ];

    return {
      ...state,
      loadedData,
      filter: {
        ...state.filter,
        data: loadedData,
      },
    };
  },
});
