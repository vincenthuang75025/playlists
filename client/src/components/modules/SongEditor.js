import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./SongEditor.css";
import { get, post, trunc} from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 * @param {JSON} song of the user
 * @param {function} updateStatus to re-update status
 */
const SongEditor = (props) => {
    const [attrs, setAttrs] = useState([]);
    const [value, setValue] = useState("");
    const [attr, setAttr] = useState("None");
    const [values, setValues] = useState({});
    const [attrTypes, setAttrTypes] = useState({});
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            let types = {};
            attributes.forEach((item, _) => types[item["attribute"]] = item["type"]);
            setAttrTypes(types);
            const attrNames = attributes.map((attr, i) => (attr.type === 'String') ? attr.attribute.concat(" (Str)"): attr.attribute.concat(" (Num)")).sort();
            setAttrs(attrNames);
        });
    }, []);

    useEffect(() => {
        const {googleid: remove1, url: remove2, Artist: remove3, Name: remove4, _id: remove5, __v: remove6, ...rest} = props.song;
        setValues(rest);
    }, [])

    const handleSubmit = () => {
        let q = {'googleid': props.userId, 'url': props.song.url, 'Name': props.song.name, 'artist': props.song.Artist};
        for (var item in values) {
            q[item] = values[item];
        }
        // delete song at some point
        post("/api/replacesong", {old: props.song._id, new: q}).then((resp) => {
            console.log(resp);
            props.updateStatus();
        });
    }

    const handleValueChange = (event) => {
        setValue(event.target.value);
    }

    const handleValueSubmit = (event) => {
        event.preventDefault();
        const tempAttr = trunc(attr);
        if (attr !== "None" && value !== "None") {
            if (attrTypes[tempAttr] === "String") {
                setValues({...values, [tempAttr]: value});
                setErrorMsg("");
            } 
            else if (!(isNaN(Number(value)))) {
                setValues({...values, [tempAttr]: Number(value)});
                setErrorMsg("");
            }
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
    <div className="SongEditor-wrapper">
    <div className="SongEditor-error">{errorMsg}</div>
    <form className="SongEditor-form">
        <div className="SongEditor-row">
            <label>Choose an attribute to describe: </label>
            <select name="attr" id="attr" onChange={handleAttrChange}>
                <option key={-1} value={"None"}>None</option>
                {attrs.map((attr,i) => <option key={i} value={attr}>{attr} </option>)}
            </select>
        </div>
        <div className="u-flexColumn">
            <div className="SongEditor-row">
                <label>Choose a value to give the attribute: </label>
                <input id="attrValue" onChange={handleValueChange} placeholder="Put value here"/>
            </div>
            <button type="submit" value="Submit" className="SongEditor-button SongEditor-small" onClick={handleValueSubmit}>
                Submit Value
            </button>
        </div>
    </form>
    <div className="u-bold">
        Current Attributes
    </div>
    {(Object.keys(values).length === 0) ? <div>No attributes yet -- add some!</div>: Object.keys(values).map((value, i) => <div className="SongEditor-hoverRed" key={-i} onClick={() => removeKey(value)}>{value}: {values[value]}</div>)}
    <button type="submit" value="Submit" className="SongEditor-button SongEditor-right" onClick={handleSubmit}>
        Submit Song
    </button>
    </div>
     </>
    );

}
export default SongEditor;