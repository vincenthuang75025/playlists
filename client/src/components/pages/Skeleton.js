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
        {props.text}
      </div>
      <div>
        {props.userId ? 'hi' : 'bye'}
      </div>
    </>
  );
}

export default Skeleton;
