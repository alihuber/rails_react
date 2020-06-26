import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

const DeleteSuccessToast = ({ showDeleteSuccess, setShowDeleteSuccess }) => {
  return (
    <Toast
      onClose={() => setShowDeleteSuccess(false)}
      show={showDeleteSuccess}
      delay={3000}
      autohide
      style={{
        position: 'absolute',
        top: 20,
        right: 50,
      }}
    >
      <Toast.Header>
        Message
      </Toast.Header>
      <Toast.Body>Delete succesful</Toast.Body>
    </Toast>
  );
};

DeleteSuccessToast.propTypes = {
  showDeleteSuccess: PropTypes.bool.isRequired,
  setShowDeleteSuccess: PropTypes.func.isRequired,
};

export default DeleteSuccessToast;
