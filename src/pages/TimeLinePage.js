import React, { useEffect, useState } from "react";
import * as api from '../api/server';
import { Write } from "../components/timeline/Write";
import { TimeLine } from "../components/timeline/TimeLine";

// async function createFeed(name, body) {
//     const result = await fetch('http://ec2-52-78-131-251.ap-northeast-2.compute.amazonaws.com/feed/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             content: body,
//             owner: name
//         }),
//     });
//     console.log(await result.json());
//     window.location.reload();
// }

// async function readFeeds(){
//     const feedResult = await fetch('http://ec2-52-78-131-251.ap-northeast-2.compute.amazonaws.com/feed/', {
//         method: 'GET',
//     });
//     return await feedResult.json();
// }

export function TimeLinePage(props){
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const server = async () => {
            setFeeds(await api.readFeeds());
        }
        server();
    }, []);

    return <>
        <Write
            readFeeds = {api.readFeeds}
            setFeeds = {setFeeds}
            writeFunc = {api.createFeed}
        />
        <div>
            <TimeLine
                feeds = {feeds}
            />
        </div>
    </>;
}