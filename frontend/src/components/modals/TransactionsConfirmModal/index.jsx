import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { closeConfirmModal } from '../../redux/features/confirmModal';
import { removeTransactions } from '../../redux/features/transactions/fetchActions';

const InvestmentConfirmModal = () => {
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.confirmModal);

  const { payload, isOpened } = confirmModal;

  const handleConfirm = () => {
    dispatch(removeTransactions(payload.id));
    dispatch(closeConfirmModal());
  };

  return (
    <>
      <Modal show={isOpened} onHide={() => dispatch(closeConfirmModal())} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir este item permanentemente?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeConfirmModal())}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InvestmentConfirmModal;
