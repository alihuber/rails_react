import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  return (
    <Container fluid>
      <Row>
        <Nav onSelect={(eventKey) => setSelectedMenu(eventKey)} defaultActiveKey="Dashboard" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="sidebar-sticky">
            <Nav.Item>
              <Nav.Link active={'Dashboard' === selectedMenu} eventKey="Dashboard">
                <FontAwesomeIcon icon="chart-line" />&nbsp;Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={'Users' === selectedMenu} eventKey="Users">
                <FontAwesomeIcon icon="users" />&nbsp;Users
              </Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <h1> {selectedMenu} </h1>
        </div>
      </Row>
    </Container>
  );
};

export default Admin;