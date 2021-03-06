import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./AddAttribute.css";
import { get, post } from "../../utilities";
import Legend from "./Legend.js";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const AddAttribute = (props) => {
    const [attrs, setAttrs] = useState([]);
    const [name, setName] = useState("");
    const [toggle, setToggle] = useState(true); // to make sure we don't sort / fetch too much
    const [type, setType] = useState("String");
    const [attrTypes, setAttrTypes] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [desc, setDesc] = useState("");

    const forbidden = ["Name", "url", "Artist"];

    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            setAttrTypes(attributes.map((attr, i) => [attr.attribute, attr.type]).sort());
            const attrNames = attributes.map((attr, i) => attr.attribute);
            setAttrs(attrNames);
        });
    }, [toggle]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.length !== 0 && attrs.indexOf(name) === -1 && forbidden.indexOf(name) === -1) {
            post("/api/newattribute", {googleid: props.userId, attribute: name, type: type, description: desc}).then(() => {
                document.getElementById("attribute").value='';
                document.getElementById("type").value="String";
                document.getElementById("description").value="";
                setName("");
                setType("String");
                setDesc("");
                setToggle(!toggle);
            });
            setErrorMsg("");
        }
        else if (name.length === 0) {
            setErrorMsg("Attribute name can't be empty!")
        }
        else if (attrs.indexOf(name) !== -1) {
            setErrorMsg("Attribute of that name already exists!")
        }
        else {
            setErrorMsg("Can't make attributes named 'artist', 'name', and 'url'.")
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }

    return (
    <>
    <div className="AddAttribute-wrapper">
    <div className="AddAttribute-error">{errorMsg}</div>
    <form className="AddAttribute-form">
        <input className="AddAttribute-formitem" text="Test" id="attribute" onChange={handleNameChange} placeholder="Attribute name"/>
        <select className="AddAttribute-formitem" name="type" id="type" onChange={handleTypeChange}>
            <option key={-1} value="String">String</option>
            <option key={-2} value="Numerical">Numerical</option>
        </select>
        <input className="AddAttribute-formitem" id="description" onChange={handleDescChange} placeholder="Attribute description"/>
        <button className="AddAttribute-formitem" type="submit" value="Submit" className="AddAttribute-button" onClick={handleSubmit}>
              Submit
        </button>
    </form>
    
    <div>Here are the attributes you currently have: </div>
        <div className="AddAttribute-scroll">
        {attrTypes.map((attr,i) => <div className="AddAttribute-elem" key={i}>•{attr[0]} ({attr[1]}) </div>)}
        </div>
    </div>
    <div className="AddAttribute-wrapper">Attributes for name, artist, url exist by default and don't need to be added.</div>
    <div className="AddAttribute-wrapper"><Legend userId={props.userId}/></div>
     </>
    );
}
export default AddAttribute;