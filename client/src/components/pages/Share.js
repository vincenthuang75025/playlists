import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./Share.css";
import { get, post } from "../../utilities";
import Listen from "../pages/Listen.js";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const Share = (props) => {
    const [id, setId] = useState("loading");
    const [googleid, setGoogleid] = useState("");
    const [userid, setUserid] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (props.userId) {
            console.log('bye');
            get("/api/finduser", {id: props.userId}).then((user) => {
                console.log(user);
                console.log('hi');
                setId(user.publicid);
            });
        }
    }, []);

    const handleChange = (event) => {
        setGoogleid(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(googleid);
        post("/api/getuser", {publicid: googleid}).then((user) => {
            console.log(user);
            setUserid(user._id);
            setErrorMsg("");
        }).catch((error) => {
            setErrorMsg("Couldn't find user with that public id");
        })
    }


    return (
    <>
    <div className="Share-wrapper">
        <div className="Share-error">{errorMsg}</div>
        {props.userId ? <div className="Share-wide">Your public id is {id}; share with your friends so they can view your songs!</div> : <div/> }
        {userid ? <Listen userId={userid}/> : 
        <div className="Share-wide">
        <div>Ask a friend for their public id to get access to their music!</div>
        <form className="Share-form">
            <input placeholder="Friend's public id" onChange={handleChange}/>
            <button className="Share-button" type="submit" value="Submit" onClick={handleSubmit}>Submit!</button>
        </form></div>}
    </div>
     </>
    );
}
export default Share;