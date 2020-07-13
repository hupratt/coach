import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./containers/Homepage/Home";
import ProfilePage from "./containers/Profilepage/Profilepage";
import Login from "./containers/User/Login";
import SignUp from "./containers/User/SignUp";

const BaseRouter = (props) => {
  return (
    <>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/login/" component={Login} />
      <Route exact path="/signup/" component={SignUp} />
      <Route exact path="/profile/" component={ProfilePage} />
    </>
  );
};

export default BaseRouter;
