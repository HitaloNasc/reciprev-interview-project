import investmentFundReducer from './investmentFunds';
import investmentFundModalReducer from './investmentFundsModal';
import transactionsReducer from './transactions';
import confirmModalReducer from './confirmModal';
import transactionsModalReducer from './transactionsModal';

export default {
  investmentFund: investmentFundReducer,
  investmentFundModal: investmentFundModalReducer,
  transactions: transactionsReducer,
  transactionsModal: transactionsModalReducer,
  confirmModal: confirmModalReducer,
};
