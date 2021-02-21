import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./Legend.css";
import { get } from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 * @param {boolean} bool for toggling
 */
const Legend = (props) => {
    const [attrDesc, setAttrDesc] = useState([]);
    const [bool, setBool] = useState(props.bool);

    useEffect(() => {
        console.log('a');
        get("/api/attributes", {googleid: props.userId}).then((attributes) => {
            setAttrDesc(attributes.map((attr, i) => [attr.attribute, attr.description]).sort());
        });
    }, []);

    return (
    <>
    <div className="Legend">
    <div className="Legend-elem"><b>Descriptions of your existing attributes:</b></div>
    <div className="Legend-scroll">
        {attrDesc.map((attr, i) => <div className="Legend-elem">{attr[0]}: {(attr[1]===undefined) ? 'No description yet': attr[1]}</div>)}
    </div>
    </div>
    </>
    );
}
export default Legend;