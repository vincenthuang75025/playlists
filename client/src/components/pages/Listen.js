import React, {useState, useCallback, useEffect} from "react";
import "../../utilities.css";
import "./Listen.css";
import QuerySong from "../modules/QuerySong.js";
import {post } from "../../utilities";
import YouTube from "react-youtube";

/**
 * The song and category Listen.
 * @param {String} userId of the user
 */
const Listen = (props) => {
    const [ready, setReady] = useState(false);
    const [urls, setUrls] = useState([]);

    const [ind, setInd] = useState(0);
    const [vidId, setVidId] = useState("");
    const [names, setNames] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (urls.length > 0) {
        let arr = urls[ind].split('/');
        let end = arr[arr.length-1];
        setVidId(end.substring(end.length-11,end.length));
        console.log(vidId);
        }
    })

    const shuffle = () => {
        const arr = [...Array(urls.length).keys()];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        let newUrls = [];
        let newNames = [];
        for (let i = 0; i < arr.length; i++) {
            newUrls = [...newUrls, urls[arr[i]]];
            newNames = [...newNames, names[arr[i]]];
        }
        setUrls(newUrls);
        setNames(newNames);
    }

    const handleQuerySubmit = useCallback(
        (event, values, id) => {
            event.preventDefault();
            if (values.length !== 0) {
                let q = {'googleid': id};
                for (const item in values) {
                    switch(values[item][1]) {
                        case '=': 
                        q[values[item][0]] = {$eq: values[item][2]};
                        break;
                        case '≥':
                        q[values[item][0]] = {$gte: values[item][2]};
                        break;
                        case '≤':
                        q[values[item][0]] = {$lte: values[item][2]};
                        break;
                        default:
                        break;
                    }
                }
                post("/api/findsongs", q).then((songs) => {
                    if (songs.length === 0) {
                        setErrorMsg("No songs match this query");
                    }
                    else {
                        setReady(true);
                        setErrorMsg("");
                        let urlList = [];
                        let nameList = [];
                        for(const i in songs) {
                            urlList = [...urlList, songs[i].url];
                            nameList = [...nameList, songs[i].Name];
                        }
                        setUrls(urlList);
                        setNames(nameList);
                    }
                });
            }
        },
        [], // Tells React to memoize regardless of arguments.
    );

    return (
        props.userId ? 
    <>
    {
        {
          false: <QuerySong userId={props.userId} handleQuerySubmit={handleQuerySubmit} errorMsg={errorMsg}/>,
          true: <>
          <div className="Listen-wrapper">
            <div>
                <YouTube videoId={vidId} opts={{playerVars: {autoplay: 1,},}} onEnd={() => {setInd((ind+1) % urls.length)}}/>
            </div>
            <div>
                <div className="Listen-scroll">
                    {names.map((name, i) => <div className={ind===i? "u-bold":""}> {i+1}: {name}</div>)}
                </div>
                <div className="Listen-buttons">
                    <button className="Listen-button" onClick={() => {setInd((ind+1) % urls.length)}}>Skip</button>
                    <button className="Listen-button" onClick={() => {shuffle()}}>Shuffle</button>
                </div>
            </div>
          </div>
          </>
        }[ready]
    }
    </> : 
        <div className="Listen-wrapper">
            <div>Log in to listen to your music!</div>
        </div>
    );
  }
  
  export default Listen;