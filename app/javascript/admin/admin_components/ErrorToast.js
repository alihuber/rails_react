import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

const ErrorToast = ({ showError, setShowError }) => {
  return (
    <Toast
      onClose={() => setShowError(false)}
      show={showError}
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
      <Toast.Body>Not successful</Toast.Body>
    </Toast>
  );
};

ErrorToast.propTypes = {
  showError: PropTypes.bool.isRequired,
  setShowError: PropTypes.func.isRequired,
};

export default ErrorToast;
