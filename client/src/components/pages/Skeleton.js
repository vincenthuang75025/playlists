import React from "react";

import "../../utilities.css";
import "./Skeleton.css";


/**
 * The navigation bar at the top of all pages.
 * @param {String} userId of the user
 */
const Skeleton = (props) => {
  return (
    <>
      <div>
        playlist bad
      </div>
      <div>
        {props.userId ? 'logged in' : 'logged out'}
      </div>
    </>
  );
}

export default Skeleton;
