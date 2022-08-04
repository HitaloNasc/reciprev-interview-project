// global
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
// components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MaskedInput from 'react-text-mask';
import { DATE_MASK } from '../../../utils/masks';
// redux
import { getAllInvestmentsFunds } from '../../redux/features/investmentFunds/fetchActions';
import {
  createTransactions,
  updateTransactions,
} from '../../redux/features/transactions/fetchActions';
import { ACTION, closeModal } from '../../redux/features/transactionsModal';

const TRANSACTION = {
  TYPE: {
    PURCHASE: 1,
    SALE: 2,
  },
};
function TransactionsModal() {
  const initialState = (values = {}) => {
    return {
      id: values.id || undefined,
      investmentFundId: values.investmentFundId || undefined,
      transactionDate: values.transactionDate || undefined,
      type: values.type || undefined,
      quotaAmaunt: values.quotaAmaunt || undefined,
      unitPrice: values.unitPrice || undefined,
      isUpdate: values.isUpdate || false,
    };
  };

  const [state, setState] = useState(initialState());

  const investmentFunds = useSelector((state) => state.investmentFund);
  const transactionsModal = useSelector((state) => state.transactionsModal);
  const dispatch = useDispatch();

  const { isOpened } = transactionsModal;

  useEffect(() => {
    dispatch(getAllInvestmentsFunds());
    const { data, type } = transactionsModal;
    setState(initialState({ ...data, isUpdate: type === ACTION.UPDATE }));
  }, [transactionsModal]);

  const handleOnChange = (field) => (e, target) => {
    let { value } = target || e.target;
    const cState = state;
    cState[field] = value;
    setState({ ...cState });
  };

  const handleOnConfirm = () => {
    if (transactionsModal.type === ACTION.UPDATE) {
      dispatch(
        updateTransactions({
          id: state.id,
          investmentFundId: state.investmentFundId,
          transactionDate: new Date(
            state.transactionDate.split('/').reverse().join('-'),
          ).toISOString(),
          type: parseInt(state.type),
          quotaAmaunt: parseInt(state.quotaAmaunt),
          unitPrice: parseFloat(state.unitPrice),
        }),
      );
    }
    if (transactionsModal.type === ACTION.CREATE) {
      dispatch(
        createTransactions({
          investmentFundId: state.investmentFundId,
          transactionDate: new Date(
            state.transactionDate.split('/').reverse().join('-'),
          ).toISOString(),
          type: parseInt(state.type),
          quotaAmaunt: parseInt(state.quotaAmaunt),
          unitPrice: parseFloat(state.unitPrice),
        }),
      );
    }
    dispatch(closeModal());
  };

  return (
    <>
      <Modal show={isOpened} onHide={() => dispatch(closeModal())} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            {(state.isUpdate ? 'Editar' : 'Adicionar') + ' fundo de investimento'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Fundo de investimento</Form.Label>
              <Form.Select
                value={state.investmentFundId}
                onChange={handleOnChange('investmentFundId')}
              >
                <option></option>
                {!_.isEmpty(investmentFunds.filter.data) &&
                  investmentFunds.filter.data.map((fund) => (
                    <option value={fund.id} key={fund.id}>
                      {fund.name} - {fund.CNPJ}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Data da trasação</Form.Label>
                  <MaskedInput
                    type="text"
                    className="form-control"
                    value={state.transactionDate}
                    mask={DATE_MASK}
                    onChange={handleOnChange('transactionDate')}
                  />
                </Col>
                <Col>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select value={state.type} onChange={handleOnChange('type')}>
                    <option></option>
                    <option value={TRANSACTION.TYPE.PURCHASE}>Compra</option>
                    <option value={TRANSACTION.TYPE.SALE}>Venda</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.quotaAmaunt}
                    onChange={handleOnChange('quotaAmaunt')}
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Preço unitário</Form.Label>
                  <Form.Control
                    type="number"
                    value={state.unitPrice}
                    onChange={handleOnChange('unitPrice')}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </Form>
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
    </>
  );
}

export default TransactionsModal;
