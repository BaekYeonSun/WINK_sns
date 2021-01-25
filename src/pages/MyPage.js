import React, { useState, useEffect } from 'react';
import * as api from '../api/server';
import styled from 'styled-components';
import { LabelWithInput } from "../components/LabelWithInput";

export function MyPage(props){
    // const token = localStorage.getItem('token');
    // const username = localStorage.getItem('username');
    // const password = localStorage.getItem('password');
    // console.log(token);

    const [inputs, setInputs] = useState({
        username:'', password: '', email:'', last_name:'', first_name:''
    });

    const getUserInfo = async () => {
        api.readUserInfo().then(function (data){
            setInputs({
                username: data.username,
                password: localStorage.getItem('password'),
                email: data.email,
                last_name: data.last_name,
                first_name: data.first_name
            })
        });
    };
    useEffect(() =>{
        getUserInfo();
    }, []);

    const getValue = e => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const handleUpdate = e => {
        api.updateUser(inputs.username, inputs.password, inputs.email, inputs.last_name, inputs.first_name);
    }

    const handleDelete = e => {
        const { history } = props;
        api.deleteUser();
        history.push('/');
    }

    return <>
        <Wrap>
            <h2>MyPage</h2>
            <div>
                <LabelWithInput label={"username"} name={"username"} type={"text"} value={inputs.username} onChange={getValue}/>
                <LabelWithInput label={"password"} name={"password"} type={"text"} value={inputs.password} onChange={getValue}/>
                <LabelWithInput label={"email"} name={"email"} type={"email"} value={inputs.email} onChange={getValue}/>
                <LabelWithInput label={"last_name"} name={"last_name"} type={"text"} value={inputs.last_name} onChange={getValue}/>
                <LabelWithInput label={"first_name"} name={"first_name"} type={"text"} value={inputs.first_name} onChange={getValue}/>
            </div>
            <WrapBtn>
                <Button1 id={"update"} onClick={handleUpdate}>UPDATE</Button1>
                <Button2 id={"delete"} onClick={handleDelete}>DELETE</Button2>
            </WrapBtn>
        </Wrap>
    </>
}

const Wrap = styled.div`
  text-align: center;
`;
const WrapBtn = styled.div`
  text-align: center;
`;
const Button1 = styled.button`
  padding: 10px 15px 10px 15px;
  margin: 10px;
`;
const Button2 = styled.button`
  padding: 10px 15px 10px 15px;
  margin: 10px;
`;