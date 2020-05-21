import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserTable from './UserTable';

const Admin = ({ users }) => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  useEffect(() => {
    if (window.innerWidth > 800) {
      $('a#dashboard_link').removeAttr('data-toggle');
      $('a#users_link').removeAttr('data-toggle');
    }
  }, []);

  return (
    <Container fluid>
      <Row>
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="sidebar-sticky">
            <Nav.Item>
              <Nav.Link
                id="dashboard_link"
                data-toggle="collapse" data-target="#sidebarMenu" onSelect={(eventKey) => setSelectedMenu(eventKey)} active={selectedMenu === 'Dashboard'}
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
                data-toggle="collapse" data-target="#sidebarMenu" onSelect={(eventKey) => setSelectedMenu(eventKey)} active={selectedMenu === 'Users'}
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
          {selectedMenu === 'Users' ? <UserTable users={users} /> : null}
        </div>
      </Row>
    </Container>
  );
};

Admin.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Admin;
