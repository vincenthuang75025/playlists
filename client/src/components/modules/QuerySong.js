import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./QuerySong.css";
import { get} from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 * @param {func} handleQuerySubmit callback function
 */
const QuerySong = (props) => {
    const [attrs, setAttrs] = useState([]);
    const [value, setValue] = useState("");
    const [attr, setAttr] = useState("None");
    const [values, setValues] = useState([]);
    const [comp, setComp] = useState("None");
    const [attrTypes, setAttrTypes] = useState({});


    useEffect(() => {
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            let types = {};
            attributes.forEach((item, _) => types[item["attribute"]] = item["type"]);
            setAttrTypes(types);
            const attrNames = attributes.map((attr, i) => attr.attribute).sort();
            setAttrs(attrNames);
        });
    }, [props.userId]);

    const handleValueChange = (event) => {
        setValue(event.target.value);
    }

    const handleValueSubmit = (event) => {
        event.preventDefault();
        if (attr !== "None" && comp != "None" && value != "") {
            if (attrTypes[attr] === "String") {
                setValues([...values, [attr, comp, value]]);
                setAttr("None");
                setComp("None");
                setValue("");
                document.getElementById("attr").value="None";
                document.getElementById("comp").value="None";
                document.getElementById("attrValue").value="";
            }
            else {
                if (!isNaN(Number(value))) {
                    setValues([...values, [attr, comp, Number(value)]]);
                    setAttr("None");
                    setComp("None");
                    setValue("");
                    document.getElementById("attr").value="None";
                    document.getElementById("comp").value="None";
                    document.getElementById("attrValue").value="";
                }
            }
        }
    }

    const handleAttrChange = (event) => {
        setAttr(event.target.value);
    }

    const handleCompChange = (event) => {
        setComp(event.target.value);
    }

    const comps = ["None", '≤', "≥", "="];

    return (
    <>
    <div className="QuerySong-wrapper">
    <form className="QuerySong-form">
        <div className="QuerySong-row">
            <label>Choose an attribute to describe: </label>
            <select name="attr" id="attr" onChange={handleAttrChange}>
                <option key={-1} value={"None"}>None</option>
                {attrs.map((attr,i) => <option key={i} value={attr}>{attr} </option>)}
            </select>
        </div>
        <div className="QuerySong-row">
            <label>Comparison option: </label>
            <select name="comp" id="comp" onChange={handleCompChange}>
                {comps.map((comp,i) => <option key={i} value={comp}>{comp} </option>)}
            </select>
        </div>
        <div className="u-flexColumn">
            <div className="QuerySong-row">
                <label>Comparison value: </label>
                <input id="attrValue" onChange={handleValueChange} placeholder="Put value here"/>
            </div>
            <button type="submit" value="Submit" className="QuerySong-button QuerySong-small" onClick={handleValueSubmit}>
                Submit Condition
            </button>
        </div>
    </form>
    <div className="u-bold">
        Current Conditions
    </div>
    <div>
    {(values.length === 0) ? <div>No conditions yet -- add some!</div>: values.map((value, i) => <div key={-i}>{value[0]} {value[1]} {value[2]}</div>)}
    </div>
    <button type="submit" value="Submit" className="QuerySong-button QuerySong-right" onClick={(event) => props.handleQuerySubmit(event, values, props.userId)}>
        Submit Query
    </button>
    </div>
     </>
    );
}
export default QuerySong;