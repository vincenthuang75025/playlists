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
    const [toggle, setToggle] = useState(true); // to make sure we don't sort / fetch too much

    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            const attrNames = attributes.map((attr, i) => attr.attribute).sort();
            setAttrs(attrNames);
        });
    }, [toggle]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.length !== 0) {
            post("/api/newattribute", {googleid: props.userId, attribute: name}).then(() => {
                document.getElementById("attribute").value='';
                setName("");
                setToggle(!toggle);
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
        <div className="AddAttribute-scroll">
        {attrs.map((attr,i) => <div className="AddAttribute-elem" key={i}>•{attr} </div>)}
        </div>
    </div>
    <div className="u-textCenter">(Note: Attributes for name and url exist by default and don't need to be added.)</div>
     </>
    );
}
export default AddAttribute;