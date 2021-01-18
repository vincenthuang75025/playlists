import React, {useState, useCallback} from "react";
import "../../utilities.css";
import "./Listen.css";
import QuerySong from "../modules/QuerySong.js";
import { get, post } from "../../utilities";

/**
 * The song and category Listen.
 * @param {String} userId of the user
 */
const Listen = (props) => {
    const [ready, setReady] = useState(false);
    const [urls, setUrls] = useState([]);

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
                get("/api/findsongs", q).then((songs) => {
                    console.log(songs);
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
          true: <div className='u-flexColumn'>{urls.map((url, i) => <iframe key={-i} src={url} height='100' width='100' allow='autoplay; encrypted-media' title='video'/>)}</div>
          //true: urls.map((url,i) => <div>{url}</div>)
        }[ready]
    }
    </>
    );
  }
  
  export default Listen;