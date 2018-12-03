import React, { Component } from "react";
import { connect } from "react-redux";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.renderProfile = this.renderProfile.bind(this);
  }
  renderProfile() {
    console.log("RENDER PROFILE");
    if (this.props.auth.user[0]) {
      const { profileImg, firstName } = this.props.auth.user[0];
      return (
        <div>
          <h1>{firstName}</h1>
          <img src={profileImg} alt="" />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Put Spinner here...</h1>
        </div>
      );
    }
  }
  render() {
    console.log("PROFILE PROPS", this.props.auth.user[0]);
    return (
      <div>
        <h1>Profile page </h1>
        {this.renderProfile()}
      </div>
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
  {}
)(ProfilePage);
