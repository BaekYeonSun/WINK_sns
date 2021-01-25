import React, { useState } from 'react';
import * as api from '../api/server';
import {LabelWithInput} from "../components/LabelWithInput";
import styled from 'styled-components';

export function Join(props){
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        last_name: '',
        first_name: '',
    });
    const setInputData = (key, data) => {
        setInput({
            ...input,
            [key]: data,
        })
    };
    const join = async () => {
        const { history } = props;
        const token = await api.createUser(input.username, input.email, input.password, input.last_name, input.first_name);
        if(token.non_field_errors){
            token.non_field_errors.map((e) => alert(e))
        } else{
            // console.log(token);
            history.push('/');
        }
    };

    return <>
        <Title id={"title"}>JOIN</Title>
        <LabelWithInput label={"username"} name={"username"} placeholder={"input username"} onChange={(e) => setInputData('username', e.target.value)}/>
        <LabelWithInput label={"email"} name={"email"} placeholder={"input email"} type={"email"} onChange={(e) => setInputData('email', e.target.value)}/>
        <LabelWithInput label={"password"} name={"password"} placeholder={"input password"} type={"password"} onChange={(e) => setInputData('password', e.target.value)}/>
        <LabelWithInput label={"last_name"} name={"last_name"} placeholder={"input last_name"} onChange={(e) => setInputData('last_name', e.target.value)}/>
        <LabelWithInput label={"first_name"} name={"first_name"} placeholder={"input first_name"} onChange={(e) => setInputData('first_name', e.target.value)}/>
        <WrapBtn>
            <Button id={"join"} onClick={join}>JOIN</Button>
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