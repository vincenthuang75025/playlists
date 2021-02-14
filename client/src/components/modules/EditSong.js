import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./EditSong.css";
import { get, post } from "../../utilities";

/**
 * The song and category organizer.
 * @param {String} userId of the user
 */
const EditSong = (props) => {
    const [found, setFound] = useState(false);
    const [song, setSong] = useState({});
    const [name, setName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");



    const songSearch = (songName) => {
        get("/api/findsong", {googleid: props.userId, name: songName}).then((song) => {
            console.log(song);
            setFound(true);
            setErrorMsg("");
        }).catch((error) => {
            console.log(error)
            setErrorMsg("Couldn't find song of that name");
            }
        );
    }

    const randomSong = () => {
        get("/api/randomsong", {googleid: props.userId}).then((song) => {
            setFound(true);
            setSong(song);
        })
    }

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        songSearch(name);
        setName("");
        document.getElementById("name").value="";
    }

    return (
    <> 
    <div className="EditSong-wrapper">
        <div className="EditSong-error">{errorMsg}</div>
        {found ? <div>test</div> : <div>test2</div>}
        <form className="EditSong-form">
            <input id="name" onChange={handleChange} placeholder="Search for song name" className="EditSong-wide"/>
            <button type="submit" value="Submit" className="EditSong-button" onClick={handleSubmit}>Search</button>
        </form>
        <div className="u-textCenter">or...</div>
        <button className="EditSong-button" onClick={randomSong}>Update a random song!</button>
    </div>
    </>
    );
}
export default EditSong;