import React, { useState } from 'react';
import * as api from "../../api/server";
import styled from "styled-components";
import { LabelWithInput } from "../LabelWithInput";

export function Comment(props){
    const [state, setState] = useState({
        content: props.body,
    });
    const getValue = e => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleUpdate = (id, name) => {
        if(localStorage.getItem('username') === name){
            api.updateComment(id, state.content);
            alert(id+'번의 ' + name + '님의 댓글이 변경되었습니다.');
        }
        else{
            alert("작성자와 본인이 동일하지 않습니다.");
            window.location.reload();
        }
    }
    const handleDelete = (id, name) => {
        if(localStorage.getItem('username') === name){
            api.deleteComment(id);
            const postID = localStorage.getItem('postID');
            alert(postID + '번의 게시글의 ' + id +'번의 ' + name + '님의 댓글이 삭제되었습니다.');
        }
        else{
            alert("작성자와 본인이 동일하지 않습니다.");
        }
    };

    return <>
        <Wrap>
            {/*<div>id : {props.id}</div>*/}
            <div>작성자 : {props.name}</div>
            {/*<div>내용 : {props.body}</div>*/}
            <LabelWithInput label={"내용"} name={"content"} type={"text"} value={state.content} onChange={getValue}/>
            <WrapBtn>
                <Button id={"update"} onClick={() => {handleUpdate(props.id, props.name)}}>UPDATE</Button>
                <Button id={"delete"} onClick={() => {handleDelete(props.id, props.name)}}>DELETE</Button>
            </WrapBtn>
        </Wrap>
    </>;
}

const Wrap = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  padding: 15px;
  margin: 15px;
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

