import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import {
  googleLogin,
  facebookLogin,
  githubLogin,
  BASE,
} from "../../actions/api";

const Social = ({ error, onclicksocial }) => {
  return (
    <>
      <Grid.Column style={{ maxWidth: 450, marginTop: 100 }}>
        {error && <p>{error.message}</p>}
        <Segment stacked style={{ minHeight: "285" }}>
          <div className="social-box">
            <button
              className="social-login google"
              onClick={() => onclicksocial(googleLogin)}
            >
              <img src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/google-icon-logo-png-transparent.png" />
              Google
            </button>

            <button
              className="social-login facebook"
              onClick={() => onclicksocial(facebookLogin)}
            >
              <img src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/FB-Icon.png" />
              Facebook
            </button>
            <button
              className="social-login github"
              onClick={() => onclicksocial(githubLogin)}
            >
              <img src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/github.png" />
              Github
            </button>
          </div>
        </Segment>
      </Grid.Column>
    </>
  );
};

export default Social;
