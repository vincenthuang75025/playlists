import React, {useState} from "react";
import "../../utilities.css";
import "./Listen.css";
import QuerySong from "../modules/QuerySong.js";

/**
 * The song and category Listen.
 * @param {String} userId of the user
 */
const Listen = (props) => {
    const [ready, setReady] = useState(false);
    const [songs, setSongs] = useState([]);

    return (
    <>
    {
        {
          false: <QuerySong userId={props.userId}/>,
          true: <div>list of songs</div>
        }[ready]
    }
    </>
    );
  }
  
  export default Listen;