import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from 'uniforms-bootstrap4';

const updateUserSchema = new SimpleSchema({
  email: {
    type: String,
    min: 3,
  },
  password: {
    type: String,
    optional: true,
    min: 6,
    uniforms: {
      type: 'password',
    },
  },
});

const bridge = new SimpleSchema2Bridge(updateUserSchema);

const UpdateUserModal = ({
  updateUser,
  showUpdate,
  setShowUpdate,
  setShowSuccess,
  setShowError,
  setUsersInTable,
  usersInTable,
}) => {
  let formRef = useRef(null);
  if (updateUser) {
    const { email, password } = updateUser;
    const model = { email, password };
    return (
      <Modal
        show={showUpdate}
        onHide={() => setShowUpdate(false)}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm
            ref={(ref) => (formRef = ref)}
            schema={bridge}
            model={model}
            onSubmit={async (doc) => {
              formRef.reset();
              const response = await fetch(`/user/id/${updateUser.id}`, {
                method: 'PUT',
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
                setShowUpdate(false);
                setShowSuccess(true);
                const body = await response.json();
                let toRelaceIdx;
                usersInTable.forEach((u, idx) => {
                  if (u.id === body.user.id) {
                    toRelaceIdx = idx;
                  }
                });
                usersInTable[toRelaceIdx] = body.user;
                setUsersInTable(usersInTable);
              } else {
                setShowUpdate(false);
                setShowError(true);
              }
            }}
          />
        </Modal.Body>
      </Modal>
    );
  } else {
    return null;
  }
};

UpdateUserModal.propTypes = {
  updateUser: PropTypes.object,
  showUpdate: PropTypes.bool.isRequired,
  setShowUpdate: PropTypes.func.isRequired,
  setShowSuccess: PropTypes.func.isRequired,
  setShowError: PropTypes.func.isRequired,
  setUsersInTable: PropTypes.func.isRequired,
  usersInTable: PropTypes.array.isRequired,
  setPageNum: PropTypes.func.isRequired,
};

export default UpdateUserModal;
