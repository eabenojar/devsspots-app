import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchUser } from "../actions/authAction";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  componentDidMount() {
    // this.props.fetchUser();
  }
  componentWillReceiveProps(nextProps) {
    console.log("HEADER WILL RECIEVE PROPS", nextProps);
    if (nextProps.auth.isAuthenticated === true) {
      console.log("SUCESS");
      this.setState({
        auth: true
      });
    } else if (nextProps.auth.isAuthenticated === false) {
      console.log("LOGOUT SUCCESS");
      this.setState({
        auth: false
      });
    }
  }
  render() {
    console.log("HEADER PROPS", this.props);
    return (
      <Navbar
        inverse
        collapseOnSelect
        staticTop
        style={{ marginBottom: 0, width: "100vw" }}
        bsStyle="inverse"
      >
        <Navbar.Header>
          <Navbar.Brand style={{ color: "red" }}>
            <a href="/">Devs Spots</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.auth === false ? (
              <NavItem eventKey={1} href="/login" bsStyle="inverse">
                Login
              </NavItem>
            ) : (
              <Nav>
                <NavItem eventKey={1} href="/profile">
                  Profile
                </NavItem>
                <NavItem eventKey={1} href="/auth/logout">
                  Logout
                </NavItem>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(Header);
