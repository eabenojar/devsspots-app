import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar
        inverse
        collapseOnSelect
        staticTop
        style={{ marginBottom: 0, width: "100vw" }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Devs Spots</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="/login">
              Login
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
