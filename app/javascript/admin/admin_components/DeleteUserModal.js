import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import reject from 'lodash/reject';

const DeleteUserModal = ({
  deleteUserId,
  showDelete,
  setShowDelete,
  setShowDeleteSuccess,
  setShowDeleteError,
  setUsersInTable,
  usersInTable,
}) => {
  return (
    <Modal
      show={showDelete}
      onHide={() => setShowDelete(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete User?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Really delete user with id
        {' '}
        {deleteUserId}
        ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDelete(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            const response = await fetch(`/user/id/${deleteUserId}`, {
              method: 'DELETE',
              mode: 'same-origin',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              referrerPolicy: 'same-origin',
            });
            if (response.status === 200) {
              setShowDelete(false);
              setShowDeleteSuccess(true);
              const newUsers = reject(usersInTable, (u) => u.id === deleteUserId);
              setUsersInTable(newUsers);
            } else {
              setShowDelete(false);
              setShowDeleteError(true);
            }
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteUserModal.propTypes = {
  deleteUserId: PropTypes.number,
  showDelete: PropTypes.bool.isRequired,
  setShowDelete: PropTypes.func.isRequired,
  setShowDeleteSuccess: PropTypes.func.isRequired,
  setShowDeleteError: PropTypes.func.isRequired,
  setUsersInTable: PropTypes.func.isRequired,
  usersInTable: PropTypes.array.isRequired,
};

export default DeleteUserModal;
