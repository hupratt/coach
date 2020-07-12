import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./containers/Homepage/Home";
import ProfilePage from "./containers/Profilepage/Profilepage";

const BaseRouter = (props) => {
  return (
    <>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/login/" component={ProfilePage} />
    </>
  );
};

export default BaseRouter;
