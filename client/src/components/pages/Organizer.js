import React, {useState} from "react";
import "../../utilities.css";
import "./Organizer.css";
import AddAttribute from "../modules/AddAttribute.js";
import AddSong from "../modules/AddSong.js";
import EditSong from "../modules/EditSong.js";
import EditAttribute from "../modules/EditAttribute.js";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const Organizer = (props) => {
    const [subject, setSubject] = useState("songs");

    return ( props.userId ? 
      <>
        <div className="Organizer-container">
        <button className={(subject === "songs") ? "Organizer-button-active" : "Organizer-button"} onClick={() => setSubject("songs")}>Add Songs
        </button>
        <button className={(subject === "attributes") ? "Organizer-button-active" : "Organizer-button"} onClick={() => setSubject("attributes")}>Add Attributes
        </button>
        <button className={(subject === "edit") ? "Organizer-button-active" : "Organizer-button"} onClick={() => setSubject("edit")}>Edit Songs
        </button>
        <button className={(subject === "editattr") ? "Organizer-button-active" : "Organizer-button"} onClick={() => setSubject("editattr")}>Edit Attribute
        </button>
        </div>
      {
        {
          'attributes': <AddAttribute userId={props.userId}/>,
          'songs': <AddSong userId={props.userId}/>,
          'edit': <EditSong userId={props.userId}/>,
          'editattr': <EditAttribute userId={props.userId}/>
        }[subject]
      }
      </> : <>
      <div className="u-logout">
        <div>Log in to start managing music!</div>
      </div>
      </>
    );
  }
  
  export default Organizer;