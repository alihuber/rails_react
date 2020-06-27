import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from 'uniforms-bootstrap4';

const createUserSchema = new SimpleSchema({
  email: {
    type: String,
    min: 3,
  },
  password: {
    type: String,
    min: 8,
    uniforms: {
      type: 'password',
    },
  },
});

const bridge = new SimpleSchema2Bridge(createUserSchema);

const CreateUserModal = ({
  showCreate,
  setShowCreate,
  setShowSuccess,
  setShowError,
  setUsersInTable,
  usersInTable,
}) => {
  let formRef = useRef(null);
  return (
    <Modal
      show={showCreate}
      onHide={() => setShowCreate(false)}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoForm
          ref={(ref) => (formRef = ref)}
          schema={bridge}
          onSubmit={async (doc) => {
            formRef.reset();
            const response = await fetch('/users', {
              method: 'POST',
              mode: 'same-origin',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
              },
              redirect: 'error',
              referrerPolicy: 'same-origin',
              body: JSON.stringify(doc),
            });
            if (response.status === 200) {
              setShowCreate(false);
              setShowSuccess(true);
              const body = await response.json();
              usersInTable.push(body.user);
              setUsersInTable(usersInTable);
            } else {
              setShowCreate(false);
              setShowError(true);
            }
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

CreateUserModal.propTypes = {
  showCreate: PropTypes.bool.isRequired,
  setShowCreate: PropTypes.func.isRequired,
  setShowSuccess: PropTypes.func.isRequired,
  setShowError: PropTypes.func.isRequired,
  setUsersInTable: PropTypes.func.isRequired,
  usersInTable: PropTypes.array.isRequired,
};

export default CreateUserModal;
