import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "191645467216-brmqnq0k6t0r6dvrh59369rreg9bssnv.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages.
 * @param {String} userId of the user
 */

const NavBar = (props) => {
    return (
    <>
      <nav className="NavBar-container">
        <Link to="/" className="NavBar-title u-inlineBlock NavBar-Mainlink NavBar-link">
          Song Selector
        </Link>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/songs" className="NavBar-link">
            Organize songs
          </Link>
          {props.userId && (
            <Link to="/listen" className="NavBar-link">
              Listen
            </Link>
          )}
          {/* {props.userId && (
            <Link to="/data" className="NavBar-link">
              Analytics
            </Link>
          )} */}
          {props.userId && (
            <Link to="/import" className="NavBar-link">
              Import from x
            </Link>
          )}
        </div>
        <div className="LoginButton">
          {props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
          )}
        </div>
      </nav>
    </>
    );
}

export default NavBar;
