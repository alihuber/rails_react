import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

const DeleteErrorToast = ({ showDeleteError, setShowDeleteError }) => {
  return (
    <Toast
      onClose={() => setShowDeleteError(false)}
      show={showDeleteError}
      delay={3000}
      autohide
    >
      <Toast.Header>
        Message
      </Toast.Header>
      <Toast.Body>Delete not successful</Toast.Body>
    </Toast>
  );
};

DeleteErrorToast.propTypes = {
  showDeleteError: PropTypes.bool.isRequired,
  setShowDeleteError: PropTypes.func.isRequired,
};

export default DeleteErrorToast;
