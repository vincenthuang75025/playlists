import React, {useState, useCallback} from "react";

import "../../utilities.css";
import "./EditSong.css";
import SongEditor from "./SongEditor.js";
import {get} from "../../utilities";
import YouTube from "react-youtube";

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
        get("/api/findsong", {googleid: props.userId, Name: songName}).then((song) => {
            console.log(song);
            setSong(song);
            setFound(true);
            setErrorMsg("");
        }).catch((error) => {
            console.log(error);
            setErrorMsg("Couldn't find song of that name");
            }
        );
    }

    const randomSong = () => {
        get("/api/randomsong", {googleid: props.userId}).then((song) => {
            if (song[0] === undefined) {
                setErrorMsg("You have no songs yet");
            }
            else {
                setSong(song[0]);
                setFound(true);
                setErrorMsg("");
            }
        });
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

    const updateStatus = useCallback(
        () => {
            setFound(false);
        }, 
        [],
    );

    const getId = (url) => {
        let arr = url.split('/');
        let end = arr[arr.length-1];
        return(end.substring(end.length-11,end.length));

    }

    return (
    <> 
    <div className="EditSong-wrapper">
        <div className="EditSong-error">{errorMsg}</div>
        {found ? <>
        <div className="EditSong-form">
        <div>
            <div>Name: {song.name}</div>
            <div>Artist: {song.Artist}</div>
        </div>
        <YouTube videoId={getId(song.url)} opts={{width: '240', height: '135'}}/>
        </div>
        <SongEditor userId={props.userId} song={song}  updateStatus={updateStatus}/></> : <>
        <form className="EditSong-form">
            <input id="name" onChange={handleChange} placeholder="Search for song name" className="EditSong-wide"/>
            <button type="submit" value="Submit" className="EditSong-button" onClick={handleSubmit}>Search</button>
        </form>
        <div className="u-textCenter">or...</div>
        <button className="EditSong-button" onClick={randomSong}>Update a random song!</button>
        </>
        }
    </div>
    </>
    );
}
export default EditSong;