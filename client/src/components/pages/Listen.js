import React, {useState, useCallback, useEffect} from "react";
import "../../utilities.css";
import "./Listen.css";
import QuerySong from "../modules/QuerySong.js";
import { get, post } from "../../utilities";
import YouTube from "react-youtube";

/**
 * The song and category Listen.
 * @param {String} userId of the user
 */
const Listen = (props) => {
    const [ready, setReady] = useState(false);
    const [urls, setUrls] = useState([]);

    // const [test, setTest] = useState(0);
    const [ind, setInd] = useState(0);
    const [vidId, setVidId] = useState("");

    useEffect(() => {
        if (urls.length > 0) {
        let arr = urls[ind].split('/');
        setVidId(arr[arr.length-1]);
        console.log(vidId);
        }
    })

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
                setReady(true);
                post("/api/findsongs", q).then((songs) => {
                    let urlList = [];
                    for(const i in songs) {
                        urlList = [...urlList, songs[i].url];
                        setUrls(urlList);
                    }
                });
            }
        },
        [], // Tells React to memoize regardless of arguments.
    );

    return (
    <>
    {
        {
          false: <QuerySong userId={props.userId} handleQuerySubmit={handleQuerySubmit}/>,
          true: <>
            <YouTube videoId={vidId} opts={{playerVars: {autoplay: 1,},}} onEnd={() => {setInd((ind+1) % urls.length)}}/>
          <div> hi</div></>
        }[ready]
    }
    </>
    );
  }
  
  export default Listen;