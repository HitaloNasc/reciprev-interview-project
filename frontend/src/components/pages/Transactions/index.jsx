import React, { /* useState, */ useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import PageContent from '../../commons/PageContent';
import List from '../../commons/List';
import TransactionModal from '../../modals/TransactionModal';
import PopupTransactions from './PopupTransactions';
import { getAllTransactions } from '../../redux/features/transactions/fetchActions';

import styles from './Transactions.module.scss';

const parameters = [
  { column: 'Fundo de Investimento', width: 4, property: 'investmentFund' },
  { column: 'Data', width: 1, property: 'trasnsactionDateFormated' },
  { column: 'Tipo', width: 1, property: 'typeName' },
  { column: 'QTD', width: 1, property: 'quotaAmaunt' },
  { column: 'Preço unitário', width: 1, property: 'unitPriceFormated' },
  { column: 'Preço médio', width: 1, property: 'averagePriceFormated' },
  { column: 'Retorno', width: 1, property: 'returnOperationFormated' },
  { column: 'Total', width: 1, property: 'balance' },
  { column: 'Saldo', width: 1, property: 'amount' },
];

function InvestmentFund() {
  //   const inicitalState = {
  //     filters: {
  //       search: '',
  //     },
  //   };
  //   const [state, setState] = useState(inicitalState);

  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter' /* dispatch((parseInt(state.filters.search))) */);
  //   };

  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  let data = [];

  if (!_.isUndefined(transactions) && !_.isNull(transactions)) {
    data = transactions.filter.data.map((transaction) => {
      if (!_.isUndefined(transaction) && !_.isNull(transaction)) {
        console.log(transaction);
        return {
          id: transaction.id,
          investmentFundId: transaction.investmentFundId,
          investmentFund: `${transaction.investmentFund.name} - ${transaction.investmentFund.CNPJ}`,
          transactionDate: transaction.transactionDate,
          trasnsactionDateFormated: format(
            new Date(transaction.transactionDate),
            'dd/mm/yyyy HH:mm',
          ),
          type: transaction.type,
          typeName: transaction.type == 1 ? 'COMPRA' : 'VENDA',
          quotaAmaunt: transaction.quotaAmaunt,
          unitPrice: transaction.unitPrice,
          unitPriceFormated: `R$ ${transaction.unitPrice.toFixed(2)}`,
          averagePrice: transaction.averagePrice,
          averagePriceFormated: `R$ ${transaction.averagePrice.toFixed(2)}`,
          returnOperation: transaction.returnOperation,
          returnOperationFormated: `${(transaction.returnOperation * 100).toFixed(2)}%`,
          amount: transaction.amount,
          balance: transaction.balance,
        };
      }
    });
  }

  //   const handleOnChange = (field) => (e, target) => {
  //     const { value } = e.target || target;
  //     const { filters } = state;

  //     filters[field] = value;

  //     setState((prevState) => {
  //       return {
  //         ...prevState,
  //         filters,
  //       };
  //     });
  //   };

  return (
    <>
      <PageContent isSolid={false}>
        <section className={styles.header}>
          <span>
            {/* <Input
              value={state.filters.search}
              onChange={handleOnChange('search')}
              placeholder="Pesquisar..."
              icon="search"
              onKeyPress={handleKeyPress}
            /> */}
          </span>
          <span>
            <TransactionModal />
          </span>
        </section>
      </PageContent>
      <PageContent isSolid={false}>
        <List isSearch parameters={parameters} data={data}>
          <PopupTransactions />
        </List>
      </PageContent>
    </>
  );
}

export default InvestmentFund;
