import React, { Component } from "react";
// import { Navbar, Nav, NavItem } from "react-bootstrap";
import styles from "../styles/css/LoginPage.module.css";
import { fetchUser } from "../actions/authAction";
import { connect } from "react-redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("LOGIN PROPS", this.props);
    return (
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>Login </h1>
          <a href="/auth/google">
            <button
              className={styles.googleLoginButton}
              onClick={this.authUser}
            >
              Sign in with Google
            </button>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(LoginPage);
