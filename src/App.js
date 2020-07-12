import React, { useState, useEffect } from "react";
import BaseRouter from "./routes";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./actions/auth";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <Navbar />
        <BaseRouter />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
