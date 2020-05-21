import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mobileTable = (users) => (
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
            <Button size="sm" variant="primary"><FontAwesomeIcon icon="edit" /></Button>
            {' '}
            <Button size="sm" variant="danger"><FontAwesomeIcon icon="trash" /></Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const fullTable = (users) => (
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
            <Button size="sm" variant="primary"><FontAwesomeIcon icon="edit" /></Button>
            {' '}
            <Button size="sm" variant="danger"><FontAwesomeIcon icon="trash" /></Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const UserTable = ({ users }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
    <>
      <Button variant="success">Add user</Button>
      <br />
      <br />
      {isTabletOrMobile ? (mobileTable(users)) : (fullTable(users))}
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserTable;
