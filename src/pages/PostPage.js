import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import * as api from "../api/server";
import { Post } from "../components/timeline/Post";
import { Comments } from "../components/comment/Comments";
import { CommentWrite } from "../components/comment/CommentWrite";

export function PostPage({match}){
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const server = async () => {
            setComments(await api.readComments(match.params.id));
        }
        server();
    }, []);

    return <>
        <Post id={match.params.id}/>
        <div>
            <Comments
                readFeeds = {api.readComments}
                setFeeds = {setComments}
                id={match.params.id}
                comments = {comments}
            />
            <CommentWrite
                id = {match.params.id}
                writeFunc = {api.createComment}
            />
        </div>
    </>;
}