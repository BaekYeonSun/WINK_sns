import React, { useState } from 'react';
import * as api from '../api/server';
import { LabelWithInput } from '../components/LabelWithInput';
import styled from 'styled-components';

export function Login(props){
    const [input, setInput] = useState({
        username: '',
        password: '',
    });
    const setInputData = (key, data) => {
        setInput({
            ...input,
            [key]: data,
        })
    }
    const login = async () => {
        const { history } = props;
        const token = await api.createToken(input.username, input.password);
        if(token.non_field_errors){
            token.non_field_errors.map((e) => alert(e))
        } else{
            console.log(token);
            localStorage.setItem('token', token.token);
            localStorage.setItem('username', input.username);
            localStorage.setItem('password', input.password);
            history.push('/timeline');
        }
    };

    return <>
        <Title>LOGIN</Title>
        <LabelWithInput label={"username"} name={"username"} placeholder={"input username"} onChange={(e) => setInputData('username', e.target.value)}/>
        <LabelWithInput label={"password"} name={"password"} placeholder={"input password"} type={"password"} onChange={(e) => setInputData('password', e.target.value)}/>
        <WrapBtn>
            <Button id={"login"} onClick={login}>LOGIN</Button>
        </WrapBtn>
    </>
}

const Title = styled.h2`
  text-align: center;
`;
const WrapBtn = styled.div`
  text-align: center;
`;
const Button = styled.button`
  padding: 10px 15px 10px 15px;
  margin: 10px;
`;