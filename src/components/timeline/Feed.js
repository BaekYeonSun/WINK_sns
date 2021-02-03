import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export function Feed(props){
    return <>
        <Wrap>
            {/*<div>id : {props.id}</div>*/}
            <div>작성자 : {props.name}</div>
            <div>내용 : {props.body}</div>
            <WrapBtn>
                <Link to={"./post/" + props.id + "/"}>
                    <Button id={"post"}>POST PAGE</Button>
                </Link>
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