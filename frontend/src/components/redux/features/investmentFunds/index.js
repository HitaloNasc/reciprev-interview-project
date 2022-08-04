import { createAction, createReducer } from '@reduxjs/toolkit';

const initialSatate = {
  loadedData: [],
  filter: {
    term: '',
    data: [],
  },
};

export const listInvestmentsFunds = createAction('LIST_INVESTMENT_FUND');
export const addInvestmentFund = createAction('CREATE_INVESTMENT_FUND');
export const attInvestmentFund = createAction('UPDATE_INVESTMENT_FUND');
export const deleteInvestmentFund = createAction('DELETE_INVESTMENT_FUND');

export default createReducer(initialSatate, {
  [listInvestmentsFunds.type]: (state, action) => {
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
  [addInvestmentFund.type]: (state, action) => {
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
  [attInvestmentFund.type]: (state, action) => {
    const updateRow = action.payload;
    let loadedData = state.loadedData.map((row) => (row.id === updateRow.id ? updateRow : row));

    return {
      ...state,
      loadedData,
      filter: {
        ...state.filter,
        data: loadedData,
      },
    };
  },
  [deleteInvestmentFund.type]: (state, action) => {
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
