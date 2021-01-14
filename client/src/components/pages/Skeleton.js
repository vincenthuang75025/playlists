import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "191645467216-brmqnq0k6t0r6dvrh59369rreg9bssnv.apps.googleusercontent.com";

const Skeleton = (props) => {
  return (
    <>
      <div>
        {props.text}
      </div>
      <div>
        {props.userId ? 'hi' : 'bye'}
      </div>
      {props.userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={props.handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
    </>
  );
}

export default Skeleton;
