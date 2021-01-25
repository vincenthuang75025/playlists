import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./AddSong.css";
import { get, post } from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const AddSong = (props) => {
    const [url, setUrl] = useState("");
    const [attrs, setAttrs] = useState([]);
    const [value, setValue] = useState("");
    const [attr, setAttr] = useState("None");
    const [values, setValues] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            const attrNames = attributes.map((attr, i) => attr.attribute).sort();
            setAttrs(attrNames);
        });
    }, []);

    const handleSubmit = () => {
        if (url.length !== 0 && values.length !== 0 && name.length !== 0) {
            let q = {'googleid': props.userId, 'url': url, 'name': name};
            values.forEach((item, _) => q[item[0]] = item[1]);
            post("/api/newsong", q).then((resp) => {
                console.log(resp);
            });
            setUrl("");
            setName("");
            setValues([]);
            document.getElementById("url").value="";
            document.getElementById("name").value="";
        }
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleValueChange = (event) => {
        setValue(event.target.value);
    }

    const handleValueSubmit = (event) => {
        event.preventDefault();
        if (attr !== "None") {
            setValues([...values, [attr, value]]);
            setAttr("None");
            setValue("");
            document.getElementById("attr").value="None";
            document.getElementById("attrValue").value="";
        }
    }

    const handleAttrChange = (event) => {
        setAttr(event.target.value);
    }

    return (
    <>
    <div className="AddSong-wrapper">
    <input id="url" onChange={handleUrlChange} placeholder="Paste youtube url here" className="AddSong-wide"/>
    <input id="name" onChange={handleNameChange} placeholder="Name the song" className="AddSong-wide"/>
    <form className="AddSong-form">
        <div className="AddSong-row">
            <label>Choose an attribute to describe: </label>
            <select name="attr" id="attr" onChange={handleAttrChange}>
                <option key={-1} value={"None"}>None</option>
                {attrs.map((attr,i) => <option key={i} value={attr}>{attr} </option>)}
            </select>
        </div>
        <div className="u-flexColumn">
            <div className="AddSong-row">
                <label>Choose a value to give the attribute: </label>
                <input id="attrValue" onChange={handleValueChange} placeholder="Put value here"/>
            </div>
            <button type="submit" value="Submit" className="AddSong-button AddSong-small" onClick={handleValueSubmit}>
                Submit Value
            </button>
        </div>
    </form>
    <div className="u-bold">
        Current Attributes
    </div>
    {(values.length === 0) ? <div>No attributes yet -- add some!</div>: values.map((value, i) => <div key={-i}>{value[0]}: {value[1]}</div>)}
    <button type="submit" value="Submit" className="AddSong-button AddSong-right" onClick={handleSubmit}>
        Submit Song
    </button>
    </div>
     </>
    );
}
export default AddSong;