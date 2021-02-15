import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./Share.css";
import { get, post } from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const Share = (props) => {
    const [id, setId] = useState("");

    useEffect(() => {
        if (props.userId) {
            console.log('bye');
            get("/api/finduser", {id: props.userId}).then((user) => {
                console.log(user);
                console.log('hi');
                setId(user.publicid);
            }).catch((error) => {console.log(error);});
        }
    }, []);


    return (
    <>{props.userId ? 'hi': 'bye'}
     </>
    );
}
export default Share;