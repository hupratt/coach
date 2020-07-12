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
import { authSignup } from "../../actions/auth";
import { googleLogin, facebookLogin, githubLogin } from "../../constants";

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
    if (token) {
      return <Redirect to="/" />;
    }
    return (
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
                </Segment>
              </Form>
              <Message>
                Already have an account? <NavLink to="/login">Login</NavLink>
              </Message>
            </React.Fragment>
          </Grid.Column>
          <Grid.Column style={{ maxWidth: 450, marginTop: 100 }}>
            {error && <p>{this.props.error.message}</p>}
            <Segment stacked style={{ minHeight: "285" }}>
              <div className="social-box">
                <button
                  className="social-login google"
                  onClick={() => (window.location.href = googleLogin)}
                >
                  <img src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/google-icon-logo-png-transparent.png" />
                  Google
                </button>

                <button
                  className="social-login facebook"
                  onClick={() => (window.location.href = facebookLogin)}
                >
                  <img src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/FB-Icon.png" />
                  Facebook
                </button>
                <button
                  className="social-login github"
                  onClick={() => (window.location.href = githubLogin)}
                >
                  <img src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/github.png" />
                  Github
                </button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
