import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import { DATE_MASK } from '../../../utils/masks';
import { getAllInvestmentsFunds } from '../../redux/features/investmentFunds/fetchActions';
import {
  createTransactions,
  updateTransactions,
  getAllTransactions,
} from '../../redux/features/transactions/fetchActions';

function TransactionModal({ isUpdate, data }) {
  const initialState = (values = {}) => {
    return {
      id: values.id || null,
      investmentFundId: values.investmentFundId || null,
      transactionDate: values.transactionDate || '',
      type: values.type || null,
      quotaAmaunt: values.quotaAmaunt || '',
      unitPrice: values.unitPrice || '',
    };
  };

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState());

  const investmentFunds = useSelector((state) => state.investmentFund);
  let options = [];
  if (!_.isEmpty(investmentFunds.filter.data))
    options = investmentFunds.filter.data.map((investment) => {
      return {
        text: investment.name,
        value: investment.id,
      };
    });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvestmentsFunds());
    if (isUpdate) {
      setState(initialState(data));
    }
  }, []);

  const handleOnChange = (field) => (e, target) => {
    let { value } = target || e.target;

    const cState = state;

    // if (field === 'transactionDate') value = new Date(value).toISOString();

    cState[field] = value;

    setState({ ...cState });
  };

  const handleOnConfirm = () => {
    if (isUpdate) {
      dispatch(updateTransactions({ id: data.id, name: state.name, CNPJ: state.CNPJ }));
      dispatch(getAllTransactions());
    } else {
      !_.isEmpty(Object.values(state).filter((b) => b)) &&
        dispatch(
          createTransactions({
            investmentFundId: state.investmentFundId,
            transactionDate: new Date(state.transactionDate),
            type: state.type,
            quotaAmaunt: parseInt(state.quotaAmaunt),
            unitPrice: parseFloat(state.unitPrice),
          }),
        );
      setState(initialState());
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={isUpdate ? <Button secondary>Editar</Button> : <Button positive>Adicionar</Button>}
      size="tiny"
    >
      <Modal.Header
        content={
          isUpdate
            ? 'Editar Transação'.toLocaleUpperCase()
            : 'Adicionar Transação'.toLocaleUpperCase()
        }
      />
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Dropdown
              label="Fundo de investimento"
              value={state.investmentFundId}
              onChange={handleOnChange('investmentFundId')}
              required
              placeholder="Selecione..."
              width={12}
              selection
              options={options}
            ></Form.Dropdown>
            <Form.Input
              label="Data"
              placeholder="Ex.: 00/00/0000"
              control={MaskedInput}
              mask={DATE_MASK}
              required
              value={state.transactionDate}
              onChange={handleOnChange('transactionDate')}
            ></Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Dropdown
              label="Tipo"
              value={state.type}
              onChange={handleOnChange('type')}
              required
              placeholder="Selecione..."
              width={8}
              selection
              options={[
                { text: 'Compra', value: 1 },
                { text: 'Venda', value: 2 },
              ]}
            ></Form.Dropdown>
            <Form.Input
              width={6}
              label="QTD"
              placeholder="Ex.: Exemplo Ltda"
              required
              type="number"
              value={state.quotaAmaunt}
              onChange={handleOnChange('quotaAmaunt')}
            ></Form.Input>
            <Form.Input
              width={6}
              label="unitPrice"
              placeholder="Ex.: Exemplo Ltda"
              required
              type="number"
              value={state.unitPrice}
              onChange={handleOnChange('unitPrice')}
            ></Form.Input>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancelar" onClick={handleClose} />
        <Button content="Confirmar" onClick={handleOnConfirm} primary />
      </Modal.Actions>
    </Modal>
  );
}

TransactionModal.propTypes = {
  isUpdate: PropTypes.bool,
  data: PropTypes.object,
};

export default TransactionModal;
