import React, { useState, useEffect } from "react";
import BaseRouter from "./routes";
import Navbar from "./components/navbar/Navbar";
import BottomNavigation from "./components/navbar/BottomNav";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./actions/auth";
import { grabQuoteOfTheDay } from "./actions/quote";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.grabQuoteOfTheDay();
  }

  render() {
    return (
      <Router>
        <Navbar avatar={this.props.avatar} />
        <BaseRouter />
        <BottomNavigation />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    avatar: state.auth.avatar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
    grabQuoteOfTheDay: () => dispatch(grabQuoteOfTheDay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
