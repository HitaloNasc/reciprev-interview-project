import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Input /* , Button */ } from 'semantic-ui-react';
import PageContent from '../../commons/PageContent';
import List from '../../commons/List';
import InvestmentFundModal from '../../modals/InvestmentFundModal';
import PopupInvestmentFund from './PopupInvestmentFund';
import { getAllInvestmentsFunds } from '../../redux/features/investmentFunds/fetchActions';
import styles from './InvestmentFund.module.scss';

const parameters = [
  { column: 'CNPJ', width: 1, property: 'CNPJ' },
  { column: 'RAZÃO SOCIAL', width: 2, property: 'name' },
];

function InvestmentFund() {
  const inicitalState = {
    filters: {
      search: '',
    },
  };
  const [state, setState] = useState(inicitalState);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' /* dispatch((parseInt(state.filters.search))) */);
  };

  const investmentFunds = useSelector((state) => state.investmentFund);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvestmentsFunds());
  }, []);

  let data = [];

  if (!_.isEmpty(investmentFunds.filter.data)) data = investmentFunds.filter.data;

  const handleOnChange = (field) => (e, target) => {
    const { value } = e.target || target;
    const { filters } = state;

    filters[field] = value;

    setState((prevState) => {
      return {
        ...prevState,
        filters,
      };
    });
  };

  return (
    <>
      <PageContent isSolid={false}>
        <section className={styles.header}>
          <span>
            <Input
              value={state.filters.search}
              onChange={handleOnChange('search')}
              placeholder="Pesquisar..."
              icon="search"
              onKeyPress={handleKeyPress}
            />
          </span>
          <span>
            <InvestmentFundModal />
          </span>
        </section>
      </PageContent>
      <PageContent isSolid={false}>
        <List isSearch parameters={parameters} data={data}>
          <PopupInvestmentFund />
        </List>
      </PageContent>
    </>
  );
}

export default InvestmentFund;
