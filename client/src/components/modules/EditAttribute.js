import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./EditAttribute.css";
import {get, post} from "../../utilities";
import Legend from "./Legend.js";
import "./Legend.css";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const EditAttribute = (props) => {
    const [toggle, setToggle] = useState(true);
    const [desc, setDesc] = useState("");

    const [attrDesc, setAttrDesc] = useState([]);

    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            console.log(attributes);
            setAttrDesc(attributes.map((attr, i) => [attr.attribute, attr.description]).sort());
        });
    }, [toggle]);

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let i = document.getElementById("attr").value;
        if (i !== "None") {
            console.log(i);
            setToggle(!toggle);
            post("/api/attributedesc", {googleid: props.userId, attribute: attrDesc[i][0], description: desc}).then(
                (attr) => {
                    setToggle(!toggle);
                    console.log(toggle);
                    document.getElementById("attr").value = "None";
                    document.getElementById("desc").value = "";
                }
            )
        }
    }

    return (
    <> 
    <div className="EditAttribute-wrapper">
        <form className="EditAttribute-form">
            <div className="EditAttribute-row">
            <div>Choose attribute description to edit:</div>
            <select name="attr" id="attr">
                <option key={-1} value={"None"}>None</option>
                {attrDesc.map((attr,i) => <option key={i} value={i}>{attr[0]} </option>)}
            </select>
            </div>
            <div className="EditAttribute-row">
                <input className="EditAttribute-wide" id="desc" placeholder="New description" onChange={handleDescChange}/>
            </div>
            <button type="submit" value="Submit" className="EditAttribute-button" onClick={handleSubmit}>Submit new description</button>
        </form>
        <Legend userId={props.userId} bool={toggle}/>
        {/* <div className="Legend">
    <div className="Legend-elem"><b>Descriptions of your existing attributes:</b></div>
    <div className="Legend-scroll">
        {attrDesc.map((attr, i) => <div className="Legend-elem">{attr[0]}: {(attr[1]===undefined) ? 'No description yet': attr[1]}</div>)}
    </div>
    </div> */}
    </div>
    </>
    );
}
export default EditAttribute;