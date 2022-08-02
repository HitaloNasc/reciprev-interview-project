import * as InvestmentFundsApi from '../../../../../api/InvestmentFund';
import {
  listInvestmentsFunds,
  addInvestmentFund,
  attInvestmentFund,
  deleteInvestmentFund,
} from '..';

export const getAllInvestmentsFunds = () => {
  return (dispatch) => {
    InvestmentFundsApi.list()
      .then((res) => {
        dispatch(listInvestmentsFunds(res.data.message));
      })
      .catch(dispatch(listInvestmentsFunds([])));
  };
};

export const createInvestmentFund = (data) => {
  return (dispatch) => {
    InvestmentFundsApi.create(data)
      .then((res) => dispatch(addInvestmentFund(res.data.message)))
      .catch(dispatch(addInvestmentFund(null)));
  };
};

export const updateInvestmentFund = (data) => {
  return (dispatch) => {
    InvestmentFundsApi.update(data)
      .then((res) => dispatch(attInvestmentFund(res.data.message)))
      .catch(dispatch(attInvestmentFund(null)));
  };
};

export const removeInvestmentFund = (id) => {
  return (dispatch) => {
    InvestmentFundsApi.remove(id)
      .then((res) => dispatch(deleteInvestmentFund(res.data.message)))
      .catch(dispatch(deleteInvestmentFund(null)));
  };
};
