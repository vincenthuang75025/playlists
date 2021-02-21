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
    <div className="u-logout">
      <div>
        Eventually put some demo or tutorial here. 
      </div>
      <div>
        {props.userId ? 'Logged in!' : 'Logged out.'}
      </div>
    </div>
    </>
  );
}

export default Skeleton;
