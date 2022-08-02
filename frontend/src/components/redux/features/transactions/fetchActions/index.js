import * as Transactions from '../../../../../api/transactions';
import { listTransactions, addTransactions, attTransactions, deleteTransactions } from '..';

export const getAllTransactions = () => {
  return (dispatch) => {
    Transactions.list()
      .then((res) => {
        dispatch(listTransactions(res.data.message));
      })
      .catch(dispatch(listTransactions([])));
  };
};

export const createTransactions = (data) => {
  return (dispatch) => {
    Transactions.create(data)
      .then((res) => dispatch(addTransactions(res.data.message)))
      .catch(dispatch(addTransactions(null)));
  };
};

export const updateTransactions = (data) => {
  return (dispatch) => {
    Transactions.update(data)
      .then((res) => dispatch(attTransactions(res.data.message)))
      .catch(dispatch(attTransactions(null)));
  };
};

export const removeTransactions = (id) => {
  return (dispatch) => {
    Transactions.remove(id)
      .then((res) => dispatch(deleteTransactions(res.data.message)))
      .catch(dispatch(deleteTransactions(null)));
  };
};
