import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./containers/Homepage/Home";
import ProfilePage from "./containers/Profilepage/Profilepage";
import Login from "./containers/User/Login";
import SignUp from "./containers/User/SignUp";
import FallBackPage from "./containers/FallBackPage";
import TermsOfUsePage from "./containers/TermsOfUsePage";
import PrivacyPolicyPage from "./containers/PrivacyPolicyPage";

const BaseRouter = (props) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Homepage {...props} />} />
      <Route exact path="/accounts/login/" component={Login} />
      <Route exact path="/accounts/signup/" component={SignUp} />
      <Route
        exact
        path="/accounts/profile/"
        render={() => <ProfilePage {...props} />}
      />
      <Route exact path="/terms-of-use/" component={TermsOfUsePage} />
      <Route exact path="/privacy-policy/" component={PrivacyPolicyPage} />
      <Route component={FallBackPage} />
    </Switch>
  );
};

export default BaseRouter;
