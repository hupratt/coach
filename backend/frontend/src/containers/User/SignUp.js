import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup, sociallogin } from "../../actions/auth";
import {
  googleLogin,
  facebookLogin,
  githubLogin,
  BASE,
} from "../../actions/api";
// import arrowleft from "../../images/long-arrow-pointing-to-left-white.svg";
import { Link } from "react-router-dom";
import Social from "./Social";

class RegistrationForm extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;
    this.props.signup(username, email, password1, password2);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { username, email, password1, password2 } = this.state;
    const { error, loading, token } = this.props;
    if (localStorage.getItem("token")) {
      return <Redirect to="/accounts/profile" />;
    }
    return (
      <>
        <Link to="/" style={{ zIndex: 1, position: "relative" }}>
          <img
            className="home-icon"
            src={`${BASE}/static/frontend/images/long-arrow-pointing-to-left-white.svg`}
            width="60px"
            height="60px"
            alt="Home"
          />
        </Link>
        <Grid
          columns={2}
          divided
          textAlign="center"
          verticalAlign="middle"
          className="signupForm"
        >
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450, marginTop: 100 }}>
              <Header as="h2" color="black" textAlign="center">
                Signup to your account
              </Header>
              {error && <p>{this.props.error.message}</p>}

              <React.Fragment>
                <Form size="large" onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input
                      onChange={this.handleChange}
                      value={username}
                      name="username"
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Username"
                    />
                    <Form.Input
                      onChange={this.handleChange}
                      value={email}
                      name="email"
                      fluid
                      icon="mail"
                      iconPosition="left"
                      placeholder="E-mail address"
                    />
                    <Form.Input
                      onChange={this.handleChange}
                      fluid
                      value={password1}
                      name="password1"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    />
                    <Form.Input
                      onChange={this.handleChange}
                      fluid
                      value={password2}
                      name="password2"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Confirm password"
                      type="password"
                    />

                    <Button
                      color="grey"
                      fluid
                      size="large"
                      loading={loading}
                      disabled={loading}
                    >
                      Signup
                    </Button>
                    <Message>
                      By signing up you are agreeing to our{" "}
                      <NavLink to="/terms-of-use/">
                        Terms and Conditions
                      </NavLink>
                    </Message>
                  </Segment>
                </Form>
                <Message>
                  Already have an account?{" "}
                  <NavLink to="/accounts/login">Login</NavLink>
                </Message>
              </React.Fragment>
            </Grid.Column>
            <Social error={error} onclicksocial={this.props.onclicksocial} />
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
    onclicksocial: (platform) => dispatch(sociallogin(platform)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
