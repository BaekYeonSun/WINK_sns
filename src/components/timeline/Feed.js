import React from 'react';
import * as api from '../../api/server';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export function Feed(props){
    const handleDelete = (id, name) => {
        if(localStorage.getItem('username') === name){
            api.deleteFeed(id)
            alert(id+'번의 ' + name + '님의 게시글이 삭제되었습니다.');
        }
        else{
            alert("작성자와 본인이 동일하지 않습니다.");
        }
    };

    return <>
        <Wrap>
            {/*<div>id : {props.id}</div>*/}
            <div>작성자 : {props.name}</div>
            <div>내용 : {props.body}</div>
            <WrapBtn>
                <Link to={"./post/" + props.id + "/"}>
                    <Button id={"comment"}>COMMENT</Button>
                </Link>
                <Button id={"delete"} onClick={() => {handleDelete(props.id, props.name)}}>DELETE</Button>
            </WrapBtn>
        </Wrap>
    </>;
}

const Wrap = styled.div`
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  padding: 15px;
  margin: 15px;
  border-radius: 10px;
`;
const WrapBtn = styled.div`
  text-align: center;
`;
const Button = styled.button`
  padding: 10px 15px 10px 15px;
  margin: 10px;
`;