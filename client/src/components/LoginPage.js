import React, { Component } from "react";
// import { Navbar, Nav, NavItem } from "react-bootstrap";
import styles from "../styles/css/LoginPage.module.css";
import { fetchUser } from "../actions/authAction";
import { connect } from "react-redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.authUser = this.authUser.bind(this);
  }
  authUser(event) {
    // console.log("AUTH CLICKED");
    // this.props.loginUser();
    // // this.props.history.push("/auth/google");
    // event.preventDefault();
  }
  render() {
    console.log("LOGIN PROPS", this.props);
    return (
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Login Here</h1>
          <a href="/auth/google">
            <button onClick={this.authUser}>Sign In</button>
          </a>
          <a href="/auth/logout">
            <button onClick={this.authUser}>Log Out</button>
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
