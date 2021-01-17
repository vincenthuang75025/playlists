import React, {useState} from "react";
import "../../utilities.css";
import "./Listen.css";
import AddAttribute from "../modules/AddAttribute.js";
import AddSong from "../modules/AddSong.js";

/**
 * The song and category Listen.
 * @param {String} userId of the user
 */
const Listen = (props) => {
    const [ready, setReady] = useState(false);

    return (
      <>
        <div>
        test?{ready}
        </div>
      </>
    );
  }
  
  export default Listen;