import React, { useState, useEffect } from 'react';
import * as api from '../../api/server';
import styled from 'styled-components';

export function Post(props){
    const [post, setPost] = useState({
        name: '',
        content: '',
    })

    const getPostInfo = async () => {
        api.readPost(props.id).then(function (data){
            localStorage.setItem("postID", data.id);
            setPost({
                name: data.username,
                content: data.content,
            });
        });
    };
    useEffect(() =>{
        getPostInfo();
    }, []);

    return <>
        <Wrap>
            <div>작성자 : {post.name}</div>
            <div>내용 : {post.content}</div>
        </Wrap>
    </>
}

const Wrap = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  padding: 15px;
  margin: 15px;
  border-style: double;
  border-radius: 10px;
`;