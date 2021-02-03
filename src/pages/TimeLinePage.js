import React, { useEffect, useState } from "react";
import * as api from '../api/server';
import { PostWrite } from "../components/timeline/PostWrite";
import { TimeLine } from "../components/timeline/TimeLine";

export function TimeLinePage(props){
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const server = async () => {
            setFeeds((await api.readFeeds()).reverse());
        }
        server();
    }, []);

    return <>
        <PostWrite
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