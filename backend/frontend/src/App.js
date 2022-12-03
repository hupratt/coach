import React, { useState, useEffect } from "react";
import BaseRouter from "./routes";
import Navbar from "./components/navbar/Navbar";
import BottomNavigation from "./components/navbar/BottomNav";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState, checkAuthTimeout } from "./actions/auth";

import { grabQuoteOfTheDay } from "./actions/quote";

class App extends React.Component {
  componentDidMount() {
    // console.log("hello");
    this.props.grabQuoteOfTheDay();
    if (!localStorage.getItem("token") || !this.props.user.token) {
      this.props.checkAuthTimeout(10);
    }
  }

  render() {
    return (
      <Router>
        <Navbar user={this.props.user} />
        <BaseRouter user={this.props.user} />
        <BottomNavigation />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
    grabQuoteOfTheDay: () => dispatch(grabQuoteOfTheDay()),
    checkAuthTimeout: (seconds) => dispatch(checkAuthTimeout(seconds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
