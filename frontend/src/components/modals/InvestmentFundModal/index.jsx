// global
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MaskedInput from 'react-text-mask';
import { CNPJ_MASK } from '../../../utils/masks';
// redux
import {
  createInvestmentFund,
  updateInvestmentFund,
} from '../../redux/features/investmentFunds/fetchActions';
import { ACTION, closeModal } from '../../redux/features/investmentFundsModal';

function InvestmentFundModal() {
  const initialState = (values = {}) => {
    return {
      id: values.id || '',
      name: values.name || '',
      CNPJ: values.CNPJ || '',
      isUpdate: values.isUpdate || false,
    };
  };

  const [state, setState] = useState(initialState());

  const investmentFundModal = useSelector((state) => state.investmentFundModal);
  const dispatch = useDispatch();

  const { isOpened } = investmentFundModal;

  useEffect(() => {
    const { data, type } = investmentFundModal;
    setState(initialState({ ...data, isUpdate: type === ACTION.UPDATE }));
  }, [investmentFundModal]);

  const handleOnChange = (field) => (e, target) => {
    const { value } = e.target || target;
    const cState = state;
    cState[field] = value;
    setState({ ...cState });
  };

  const handleOnConfirm = () => {
    if (investmentFundModal.type === ACTION.UPDATE) {
      dispatch(updateInvestmentFund({ id: state.id, name: state.name, CNPJ: state.CNPJ }));
    }
    if (investmentFundModal.type === ACTION.CREATE) {
      dispatch(createInvestmentFund({ name: state.name, CNPJ: state.CNPJ }));
    }
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpened} onHide={() => dispatch(closeModal())} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          {(state.isUpdate ? 'Editar' : 'Adicionar') + ' fundo de investimento'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="cnpj" className="form-label">
              CNPJ
            </label>
            <MaskedInput
              type="text"
              className="form-control"
              value={state.CNPJ}
              mask={CNPJ_MASK}
              onChange={handleOnChange('CNPJ')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Razão Social
            </label>
            <input
              type="text"
              className="form-control"
              value={state.name}
              onChange={handleOnChange('name')}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleOnConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InvestmentFundModal;
