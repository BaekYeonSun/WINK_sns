import React from 'react';
import { Feed } from './Feed';

export function TimeLine(props){
    return props.feeds.map((feed) => <Feed key={feed.id} id={feed.id} name={feed.owner} body={feed.content} />)
}