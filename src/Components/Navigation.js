import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar className="shadow-lg" bg="dark" expand="lg">
      <Nav.Link
        as={Link}
        className="navbar-brand d-inline p2 bg-dark text-white"
        to="/"
      >
        SoftServe
      </Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} className="d-inline p2 bg-dark text-white" to="/">
            Add Customer
          </Nav.Link>
          <Nav.Link
            as={Link}
            className="d-inline p2 bg-dark text-white"
            to="/Components/ListCustomers"
          >
            List Customers
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
