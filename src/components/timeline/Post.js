import React, { useState, useEffect } from 'react';
import * as api from '../../api/server';
import styled from 'styled-components';
import { LabelWithInput } from "../LabelWithInput";

export function Post(props){
    const [post, setPost] = useState({
        name: '',
        content: '',
    });

    const getValue = e => {
        const {name, value} = e.target;
        setPost({
            ...post,
            [name]: value,
        });
    };

    const getPostInfo = async () => {
        api.readPost(props.id).then(function (data){
            localStorage.setItem("postID", data.id);
            setPost({
                name: data.username,
                content: data.content,
            });
        });
    };
    useEffect(() => {
        getPostInfo();
    }, []);

    const handleUpdate = (id, name, content) => {
        if(localStorage.getItem('username') === name){
            api.updatePost(id, content);
            alert(id + '번의 ' + name + '님의 게시글이 변경되었습니다.');
        }
        else{
            alert("작성자와 본인이 동일하지 않습니다.");
        }
    };

    const handleDelete = (id, name) => {
        if(localStorage.getItem('username') === name){
            api.deletePost(id);
            alert(id + '번의 ' + name + '님의 게시글이 삭제되었습니다.');
        }
        else{
            alert("작성자와 본인이 동일하지 않습니다.");
        }
    };

    return <>
        <Wrap>
            <div>작성자 : {post.name}</div>
            {/*<div>내용 : {post.content}</div>*/}
            <LabelWithInput label={"내용"} name={"content"} type={"text"} value={post.content} onChange={getValue}/>
            <WrapBtn>
                <Button id={"update"} onClick={() => {handleUpdate(props.id, post.name, post.content)}}>UPDATE</Button>
                <Button id={"delete"} onClick={() => {handleDelete(props.id, post.name)}}>DELETE</Button>
            </WrapBtn>
        </Wrap>
    </>
}

const Wrap = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  padding: 15px;
  margin: 15px;
  border-style: double;
  border-radius: 10px;
  text-align: center;
`;
const WrapBtn = styled.div`
  text-align: center;
`;
const Button = styled.button`
  padding: 10px 15px 10px 15px;
  margin: 10px;
`;