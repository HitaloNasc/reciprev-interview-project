// global
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
// components
import TransactionsModal from '../../modals/TransactionsModal';
import TransactionsConfirmModal from '../../modals/TransactionsConfirmModal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MaskedInput from 'react-text-mask';
import { DATE_MASK } from '../../../utils/masks';
// redux
import { getAllTransactions } from '../../redux/features/transactions/fetchActions';
import { openModal, ACTION } from '../../redux/features/transactionsModal';
import { openConfirmModal } from '../../redux/features/confirmModal';

function Transactions() {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [state, setState] = useState({ dateSearch: undefined });

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const handleOnChange = (field) => (e, target) => {
    let { value } = target || e.target;
    const cState = state;
    cState[field] = value;
    setState({ ...cState });
  };

  return (
    <>
      <Row className="m-3 d-flex align-items-center">
        <Col>
          <Row className="d-flex justify-content-start">
            <Col className='m-0 p-0'>
              <MaskedInput
                type="text"
                className="form-control"
                placeholder="Busque uma data"
                value={state.dateSearch}
                mask={DATE_MASK}
                onChange={handleOnChange('dateSearch')}
              />
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => dispatch(openModal({ type: ACTION.CREATE }))}
              >
                Buscar
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => dispatch(openModal({ type: ACTION.CREATE }))}>
            Adicionar
          </Button>
        </Col>
      </Row>

      <Table striped responsive hover>
        <thead className="text-center align-end">
          <tr>
            <th className="pt-3 align-top">Razão social</th>
            <th className="pt-3 align-top">CNPJ</th>
            <th className="pt-3 align-top">Data</th>
            <th className="pt-3 align-top">Tipo</th>
            <th className="pt-3 align-top">Quantidade por operação</th>
            <th className="pt-3 align-top">Preço por unidade</th>
            <th className="pt-3 align-top">Quantidade total</th>
            <th className="pt-3 align-top">Preço médio</th>
            <th className="pt-3 align-top">Retorno por operação</th>
            <th className="pt-3 align-top">Saldo</th>
            <th className="pt-3 align-top"></th>
          </tr>
        </thead>
        <tbody>
          {!_.isEmpty(transactions.filter.data) &&
            transactions.filter.data.map((elem) => {
              if (!_.isNull(elem) && !_.isUndefined(elem)) {
                return (
                  <tr key={elem.id} className="">
                    <td className="text-nowrap">{elem.investmentFund.name}</td>
                    <td className="text-nowrap">{elem.investmentFund.CNPJ}</td>
                    <td>{format(new Date(elem.transactionDate), 'dd/MM/yyyy')}</td>
                    <td>{elem.type === 1 ? 'Compra' : 'Venda'}</td>
                    <td>{elem.quotaAmaunt}</td>
                    <td>{elem.unitPrice}</td>
                    <td>{elem.amount}</td>
                    <td>{elem.averagePrice}</td>
                    <td>{(elem.returnOperation * 100).toFixed(3)}</td>
                    <td>{elem.balance}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <Button
                        type="button"
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => dispatch(openModal({ type: ACTION.UPDATE, data: elem }))}
                      >
                        Editar
                      </Button>
                      <Button
                        type="button"
                        variant="outline-dark"
                        onClick={() => dispatch(openConfirmModal({ id: elem.id }))}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </Table>

      <TransactionsModal />
      <TransactionsConfirmModal />
    </>
  );
}

export default Transactions;
