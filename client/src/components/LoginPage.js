import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import styless from "../styles/css/LoginPage.module.css";

class LoginPage extends Component {
  render() {
    return (
      <div className={styless.main}>
        <div>
          <h1 className={styless.title}>Login Here</h1>
          <a href="/auth/google">
            <button>Sign In</button>
          </a>
        </div>
      </div>
    );
  }
}

export default LoginPage;
