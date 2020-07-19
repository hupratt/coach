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
import { authLogin, sociallogin } from "../../actions/auth";
import {
  googleLogin,
  facebookLogin,
  githubLogin,
  BASE,
} from "../../actions/api";
import "./Login.css";
// import arrowleft from "../../images/long-arrow-pointing-to-left-white.svg";
import { Link } from "react-router-dom";
import Social from "./Social";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };
  render() {
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
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
          textAlign="center"
          verticalAlign="middle"
          columns={2}
          divided
          className="loginForm"
        >
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450, marginTop: 100 }}>
              <Header as="h2" color="black" textAlign="center">
                Log-in to your account
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
                      fluid
                      value={password}
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    />

                    <Button
                      color="grey"
                      fluid
                      size="large"
                      loading={loading}
                      disabled={loading}
                    >
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <NavLink to="/accounts/signup">Sign Up</NavLink>
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
    login: (username, password) => dispatch(authLogin(username, password)),
    onclicksocial: (platform) => dispatch(sociallogin(platform)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
