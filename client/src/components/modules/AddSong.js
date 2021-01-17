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

    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            setAttrs(attributes);
        });
    });

    const handleSubmit = () => {
        if (url.length !== 0 && values.length !== 0) {
            let q = {'googleid': props.userId, 'url': url};
            values.forEach((item, _) => q[item[0]] = item[1]);
            post("/api/newsong", q).then((resp) => {
                console.log(resp);
            });
            setUrl("");
            setValues([]);
            document.getElementById("url").value="";
        }
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
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
    <input id="url" onChange={handleUrlChange} placeholder="Paste youtube url here"/>
    <form className="AddSong-form">
        <div>
            <label>Choose an attribute to describe: </label>
            <select name="attr" id="attr" onChange={handleAttrChange}>
                <option key={-1} value={"None"}>None</option>
                {attrs.map((attr,i) => <option key={i} value={attrs.attribute}>{attr.attribute} </option>)}
            </select>
        </div>
        <div>
            <label>Choose a value to give the attribute: </label>
            <input id="attrValue" onChange={handleValueChange} placeholder="Put value here"/>
            <button type="submit" value="Submit" className="AddSong-button" onClick={handleValueSubmit}>
                Submit Value
            </button>
        </div>
    </form>
    <button type="submit" value="Submit" className="AddSong-button" onClick={handleSubmit}>
            Submit Song
    </button>
    <div className="u-bold">
        Current attributes
    </div>
    {values.map((value, i) => <div key={-i}>{value[0]}: {value[1]}</div>)}
    </div>
     </>
    );
}
export default AddSong;