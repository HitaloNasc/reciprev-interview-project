import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import ConfirmModal from '../../modals/ConfirmModal';
import TransactionModal from '../../modals/TransactionModal';
import { removeTransactions } from '../../redux/features/transactions/fetchActions';
import styles from './InvestmentFund.module.scss';
import { Button } from 'semantic-ui-react';

function PopupInvestmentFund(props) {
  const dispatch = useDispatch();
  const handleClickRemove = (id) => {
    dispatch(removeTransactions(id));
  };

  return (
    <span className={styles.buttonsPopup}>
      <TransactionModal isUpdate={true} data={props.row} />
      <Button content="Excluir" onClick={() => handleClickRemove(props.row.id)} />
    </span>
  );
}

PopupInvestmentFund.propTypes = {
  row: PropTypes.object,
};

export default PopupInvestmentFund;
