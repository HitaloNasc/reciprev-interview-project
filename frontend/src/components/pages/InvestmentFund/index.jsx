// global
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
// components
import InvestmentFundModal from '../../modals/InvestmentFundModal';
import InvestmentFundConfirmModal from '../../modals/InvestmentFundConfirmModal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// redux
import { getAllInvestmentsFunds } from '../../redux/features/investmentFunds/fetchActions';
import { openModal, ACTION } from '../../redux/features/investmentFundsModal';
import { openConfirmModal } from '../../redux/features/confirmModal';

function InvestmentFund() {
  const investmentFunds = useSelector((state) => state.investmentFund);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvestmentsFunds());
  }, []);

  return (
    <>
      <div className="row justify-content-end">
        <div className="col-1 justify-content-center">
          <Button
            variant="primary"
            className="mb-2"
            onClick={() => dispatch(openModal({ type: ACTION.CREATE }))}
          >
            Adicionar
          </Button>
        </div>
      </div>

      <Table striped responsive hover>
        <thead className="text-center align-end">
          <tr>
            <th className="pt-3 align-top">Razão Social</th>
            <th className="pt-3 align-top">CNPJ</th>
            <th className="pt-3 align-top"></th>
          </tr>
        </thead>
        <tbody>
          {!_.isEmpty(investmentFunds.filter.data) &&
            investmentFunds.filter.data.map((elem) => {
              if (!_.isNull(elem) && !_.isUndefined(elem)) {
                return (
                  <tr key={elem.id}>
                    <td>{elem.name}</td>
                    <td>{elem.CNPJ}</td>
                    <td>
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

      <InvestmentFundModal />
      <InvestmentFundConfirmModal />
    </>
  );
}

export default InvestmentFund;
