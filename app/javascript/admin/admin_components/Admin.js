import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import slice from 'lodash/slice';

import UserTable from './UserTable';

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [usersInTable, setUsersInTable] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [usersLength, setUsersLength] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 800) {
      $('a#dashboard_link').removeAttr('data-toggle');
      $('a#users_link').removeAttr('data-toggle');
    }
    const perPage = 10;
    const start = pageNum * perPage;
    const end = start + perPage;
    let users = [];
    async function fetchData() {
      const response = await fetch('/users', {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'error',
        referrerPolicy: 'same-origin',
      });
      if (response.status === 200) {
        const body = await response.json();
        users = body.users;
        setUsersLength(users.length);
        const newUsers = slice(users, start, end);
        setUsersInTable(newUsers);
      }
    }
    fetchData();
  }, [pageNum, usersLength]);

  return (
    <Container fluid>
      <Row>
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="sidebar-sticky">
            <Nav.Item>
              <Nav.Link
                id="dashboard_link"
                data-target="#sidebarMenu"
                onSelect={(eventKey) => {
                  setSelectedMenu(eventKey);
                  if (window.innerWidth <= 800) {
                    $('.navbar-toggler').click();
                  }
                }}
                active={selectedMenu === 'Dashboard'}
                eventKey="Dashboard"
              >
                <FontAwesomeIcon icon="chart-line" />
                {' '}
                &nbsp;Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                id="users_link"
                data-target="#sidebarMenu"
                onSelect={(eventKey) => {
                  setSelectedMenu(eventKey);
                  if (window.innerWidth <= 800) {
                    $('.navbar-toggler').click();
                  }
                }}
                active={selectedMenu === 'Users'}
                eventKey="Users"
              >
                <FontAwesomeIcon icon="users" />
                {' '}
                &nbsp;Users
              </Nav.Link>
            </Nav.Item>
          </div>
        </nav>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <h1>
            {' '}
            {selectedMenu}
          </h1>
          {selectedMenu === 'Users' ? (
            <UserTable
              pageNum={pageNum}
              setPageNum={setPageNum}
              allUsersLength={usersLength}
              usersInTable={usersInTable}
              setUsersInTable={setUsersInTable}
              setUsersLength={setUsersLength}
            />
          ) : null}
        </div>
      </Row>
    </Container>
  );
};

export default Admin;
