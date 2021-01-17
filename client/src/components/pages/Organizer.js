import React, {useState} from "react";
import "../../utilities.css";
import "./Organizer.css";
import AddAttribute from "../modules/AddAttribute.js";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const Organizer = (props) => {
    const [subject, setSubject] = useState("songs");

    return (
      <>
        <div className="Organizer-container">
        <button className="Organizer-button" onClick={() => setSubject("songs")}>Manage Songs
        </button>
        <button className="Organizer-button" onClick={() => setSubject("attributes")}>Manage Attributes
        </button>
        </div>
        {subject === 'attributes' ? <AddAttribute userId={props.userId}/> : 'Add songs (TODO)'}
      </>
    );
  }
  
  export default Organizer;