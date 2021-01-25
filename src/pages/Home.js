import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Home(props){
    return <>
        <Wrap>
            <Title>HOME</Title>
            <Link to={"./join"}>
                <Button id={"link"}>JOIN PAGE</Button>
            </Link>
            <Link to={"./login"}>
                <Button id={"link"}>LOGIN PAGE</Button>
            </Link>
        </Wrap>
    </>
}
const Wrap = styled.div`
  text-align: center;
`;
const Title = styled.h2`
  text-align: center;
`;
const Button = styled.button`
  padding: 5px 15px 5px 15px;
  margin: 10px;
`;