import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Confirm } from 'semantic-ui-react';

const ConfirmModal = (props) => {
  const [state, setState] = useState({ open: false });

  const open = () => setState({ open: true });
  const close = () => setState({ open: false });

  return (
    <div>
      <Button onClick={open}>{props.content}</Button>
      <Confirm open={state.open} onCancel={close} content='Tem certeza que deseja excluir?' onConfirm={props.onConfirm} />
    </div>
  );
};

ConfirmModal.propTypes = {
  content: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default ConfirmModal;
