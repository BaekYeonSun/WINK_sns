import React from 'react';
import { Comment } from "./Comment";
import '../Write.css';

export function Comments(props){
    return props.comments.map((comment) => <Comment key={comment.id} id={comment.id} name={comment.owner} body={comment.content} />)
}