import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

const SuccessToast = ({ showSuccess, setShowSuccess }) => {
  return (
    <Toast
      onClose={() => setShowSuccess(false)}
      show={showSuccess}
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
      <Toast.Body>Success</Toast.Body>
    </Toast>
  );
};

SuccessToast.propTypes = {
  showSuccess: PropTypes.bool.isRequired,
  setShowSuccess: PropTypes.func.isRequired,
};

export default SuccessToast;
