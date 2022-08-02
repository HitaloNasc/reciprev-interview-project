import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import { CNPJ_MASK } from '../../../utils/masks';

import {
  createInvestmentFund,
  updateInvestmentFund,
  getAllInvestmentsFunds,
} from '../../redux/features/investmentFunds/fetchActions';

function InvestmentFundModal({ isUpdate, data }) {
  const initialState = (values = {}) => {
    return {
      name: values.name || '',
      CNPJ: values.CNPJ || '',
    };
  };

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState());

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      setState(initialState(data));
    }
  }, []);

  const handleOnChange = (field) => (e, target) => {
    const { value } = e.target || target;
    const cState = state;

    cState[field] = value;

    setState({ ...cState });
  };

  const handleOnConfirm = () => {
    if (isUpdate) {
      dispatch(updateInvestmentFund({ id: data.id, name: state.name, CNPJ: state.CNPJ }));
      dispatch(getAllInvestmentsFunds());
    } else {
      !_.isEmpty(Object.values(state).filter((b) => b)) &&
        dispatch(createInvestmentFund({ name: state.name, CNPJ: state.CNPJ }));
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
            ? 'Editar Fundo de Investimento'.toLocaleUpperCase()
            : 'Adicionar Fundo de Investimento'.toLocaleUpperCase()
        }
      />
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input
              label="CNPJ"
              placeholder="Ex.: 00.000.000/0001-00"
              control={MaskedInput}
              mask={CNPJ_MASK}
              required
              value={state.CNPJ}
              onChange={handleOnChange('CNPJ')}
            ></Form.Input>
            <Form.Input
              label="RAZÃO SOCIAL"
              placeholder="Ex.: Exemplo Ltda"
              required
              value={state.name}
              onChange={handleOnChange('name')}
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

InvestmentFundModal.propTypes = {
  isUpdate: PropTypes.bool,
  data: PropTypes.object,
};

export default InvestmentFundModal;
