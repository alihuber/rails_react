import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteUserModal from './DeleteUserModal';
import CreateUserModal from './CreateUserModal';
import UpdateUserModal from './UpdateUserModal';
import SuccessToast from './SuccessToast';
import ErrorToast from './ErrorToast';
import UserPagination from './UserPagination';

const mobileTable = (users, setShowDelete, setDeleteUserId, setShowUpdate, setUpdateUser) => (
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
            <Button
              size="sm"
              variant="primary"
              onClick={() => { setUpdateUser(u); setShowUpdate(true); }}
            >
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

const fullTable = (users, setShowDelete, setDeleteUserId, setShowUpdate, setUpdateUser) => (
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
            <Button
              size="sm"
              variant="primary"
              onClick={() => { setUpdateUser(u); setShowUpdate(true); }}
            >
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

const UserTable = ({ allUsersLength, pageNum, setPageNum, usersInTable, setUsersInTable, setUsersLength }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setShowCreate(true)}>Add user</Button>
      <br />
      <br />
      {isTabletOrMobile ?
        (mobileTable(usersInTable, setShowDelete, setDeleteUserId, setShowUpdate, setUpdateUser)) :
        (fullTable(usersInTable, setShowDelete, setDeleteUserId, setShowUpdate, setUpdateUser))}
      <UserPagination setPageNum={setPageNum} pageNum={pageNum} allUserCount={allUsersLength} />
      <DeleteUserModal
        deleteUserId={deleteUserId}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        setShowSuccess={setShowSuccess}
        setShowError={setShowError}
        setUsersInTable={setUsersInTable}
        setUsersLength={setUsersLength}
        usersInTable={usersInTable}
        setPageNum={setPageNum}
      />
      <UpdateUserModal
        updateUser={updateUser}
        showUpdate={showUpdate}
        setShowUpdate={setShowUpdate}
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
        setPageNum={setPageNum}
        setUsersLength={setUsersLength}
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
  allUsersLength: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  setPageNum: PropTypes.func.isRequired,
  usersInTable: PropTypes.array.isRequired,
  setUsersInTable: PropTypes.func.isRequired,
  setUsersLength: PropTypes.func.isRequired,
};

export default UserTable;
