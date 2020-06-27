import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteUserModal from './DeleteUserModal';
import CreateUserModal from './CreateUserModal';
import SuccessToast from './SuccessToast';
import ErrorToast from './ErrorToast';

const mobileTable = (users, setShowDelete, setDeleteUserId) => (
  <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>ID</th>
        <th>email</th>
        <th>admin</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {users && users.map((u) => (
        <tr key={u.id}>
          <td>{u.id}</td>
          <td className="truncatedText">{u.email}</td>
          <td>{u.type === 'User::AdminUser' ? 'X' : ''}</td>
          <td>
            <Button size="sm" variant="primary">
              <FontAwesomeIcon icon="edit" />
            </Button>
            {' '}
            <Button
              size="sm"
              variant="danger"
              onClick={() => { setDeleteUserId(u.id); setShowDelete(true); }}
            >
              <FontAwesomeIcon icon="trash" />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const fullTable = (users, setShowDelete, setDeleteUserId) => (
  <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>ID</th>
        <th>email</th>
        <th>admin</th>
        <th>createdAt</th>
        <th>updatedAt</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {users && users.map((u) => (
        <tr key={u.id}>
          <td>{u.id}</td>
          <td>{u.email}</td>
          <td>{u.type === 'User::AdminUser' ? 'X' : ''}</td>
          <td>{u.createdAt}</td>
          <td>{u.updatedAt}</td>
          <td>
            <Button size="sm" variant="primary">
              <FontAwesomeIcon icon="edit" />
            </Button>
            {' '}
            <Button
              size="sm" variant="danger"
              onClick={() => { setDeleteUserId(u.id); setShowDelete(true); }}
            >
              <FontAwesomeIcon icon="trash" />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const UserTable = ({ usersInTable, setUsersInTable }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setShowCreate(true)}>Add user</Button>
      <br />
      <br />
      {isTabletOrMobile ?
        (mobileTable(usersInTable, setShowDelete, setDeleteUserId)) :
        (fullTable(usersInTable, setShowDelete, setDeleteUserId))}
      <DeleteUserModal
        deleteUserId={deleteUserId}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        setShowSuccess={setShowSuccess}
        setShowError={setShowError}
        setUsersInTable={setUsersInTable}
        usersInTable={usersInTable}
      />
      <CreateUserModal
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        setShowSuccess={setShowSuccess}
        setShowError={setShowError}
        setUsersInTable={setUsersInTable}
        usersInTable={usersInTable}
      />
      <ErrorToast
        showError={showError}
        setShowError={setShowError}
      />
      <SuccessToast
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
      />
    </>
  );
};

UserTable.propTypes = {
  usersInTable: PropTypes.array.isRequired,
  setUsersInTable: PropTypes.func.isRequired,
};

export default UserTable;
