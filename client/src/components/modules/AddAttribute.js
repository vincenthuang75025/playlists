import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./AddAttribute.css";
import { get, post } from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const AddAttribute = (props) => {
    const [attrs, setAttrs] = useState([]);
    const [name, setName] = useState("");
    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
          setAttrs(attributes);
        });
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.length !== 0) {
            post("/api/newattribute", {googleid: props.userId, attribute: name}).then(() => {
                document.getElementById("attribute").value='';
                setName("");
            });
        }
    }

    const handleChange = (event) => {
        setName(event.target.value);
    }

    return (
    <>
    <div className="AddAttribute-wrapper">
    <form className="AddAttribute-form">
        <input text="Test" id="attribute" onChange={handleChange} placeholder="Add new attribute!"/>
        <button type="submit" value="Submit" className="AddAttribute-button" onClick={handleSubmit}>
              Submit
        </button>
    </form>
    
    <div>Here are the attributes you currently have: </div>
    {attrs.map((attr,i) => <div className="AddAttribute-elem" key={i}>•{attr.attribute} </div>)}
    </div>
     </>
    );
}
export default AddAttribute;