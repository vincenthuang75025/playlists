import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./AddSong.css";
import { get, post, trunc} from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const AddSong = (props) => {
    const [url, setUrl] = useState("");
    const [attrs, setAttrs] = useState([]);
    const [value, setValue] = useState("");
    const [attr, setAttr] = useState("None");
    const [values, setValues] = useState({});
    const [name, setName] = useState("");
    const [attrTypes, setAttrTypes] = useState({});
    const [artist, setArtist] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            let types = {};
            attributes.forEach((item, _) => types[item["attribute"]] = item["type"]);
            setAttrTypes(types);
            console.log(types);
            const attrNames = attributes.map((attr, i) => (attr.type === 'String') ? attr.attribute.concat(" (Str)"): attr.attribute.concat(" (Num)")).sort();
            setAttrs(attrNames);
        });
    }, []);

    const handleSubmit = () => {
        if (url.length !== 0 && name.length !== 0 && artist.length !== 0) {
            let q = {'googleid': props.userId, 'url': url, 'name': name, 'artist': artist};
            for (var item in values) {
                q[item] = values[item];
            }
            post("/api/newsong", q).then((resp) => {
                console.log(resp);
            });
            setUrl("");
            setName("");
            setArtist("");
            setValues({});
            setAttr("None");
            setValue("");
            document.getElementById("attr").value="None";
            document.getElementById("attrValue").value="";
            document.getElementById("url").value="";
            document.getElementById("name").value="";
            document.getElementById("artist").value="";
        }
        else {
            setErrorMsg("Must supply non-empty url, song name, and artist name");
        }
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    }

    const handleValueChange = (event) => {
        setValue(event.target.value);
    }

    const handleValueSubmit = (event) => {
        event.preventDefault();
        const tempAttr = trunc(attr);
        if (attr !== "None" && value !== "None") {
            if (attrTypes[tempAttr] === "String") {
                setValues({...values, [tempATtr]: value});
                setErrorMsg("");
            } 
            else if (!(isNaN(Number(value)))) {
                setValues({...values, [tempAttr]: Number(value)});
                setErrorMsg("");
            }
            console.log(attrTypes[tempAttr]);
            if (attrTypes[tempAttr] === "Numerical" && isNaN(Number(value))) {
                setErrorMsg("Can't supply non-numerical value to numerical attribute");
            }
            else {
                setAttr("None");
                setValue("");
                document.getElementById("attr").value="None";
                document.getElementById("attrValue").value="";
            }
        }
        else {
            setErrorMsg("Must supply non-empty attributes and values");
        }
    }

    const handleAttrChange = (event) => {
        setAttr(event.target.value);
    }

    const removeKey = (key) => {
        const {[key]: remove, ...rest} = values;
        setValues(rest);
    }

    return (
    <>
    <div className="AddSong-wrapper">
    <div className="AddSong-error">{errorMsg}</div>
    <input id="url" onChange={handleUrlChange} placeholder="Paste youtube url here" className="AddSong-wide"/>
    <input id="name" onChange={handleNameChange} placeholder="Name the song" className="AddSong-wide"/>
    <input id="artist" onChange={handleArtistChange} placeholder="Name the artist" className="AddSong-wide"/>
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
    {(Object.keys(values).length === 0) ? <div>No attributes yet -- add some!</div>: Object.keys(values).map((value, i) => <div className="AddSong-hoverRed" key={-i} onClick={() => removeKey(value)}>{value}: {values[value]}</div>)}
    <button type="submit" value="Submit" className="AddSong-button AddSong-right" onClick={handleSubmit}>
        Submit Song
    </button>
    </div>
     </>
    );
}
export default AddSong;