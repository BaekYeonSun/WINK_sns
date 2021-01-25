import React, { useState } from 'react';
import './Write.css';
import {Link} from "react-router-dom";

export function Write(props){
    const [state, setState] = useState({
        name: '',
        content: '',
    })

    const getValue = e => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleClick = e => {
        // console.log(state.name,":", state.content);
        props.writeFunc(state.name, state.content);
        setState({
            name: '',
            content: ''
        })
    }

    return <div id={"wrap"}>
        <div id={"component"}>
            <label>작성자</label>
            <input name="name" id={"name"} type = "text" value={state.name} onChange={getValue}/>
        </div>
        <div id={"component"}>
            <label>내용</label>
            <textarea name="content" id={"content"} cols = "30" rols = "10" value={state.content} onChange={getValue}/>
        </div>
        <div id={"wrapBtn"}>
            <Link to={"./MyPage"}>
                <button id={"btn"}>MYPAGE</button>
            </Link>
            <button id={"btn"} onClick={handleClick}>POST</button>
        </div>
    </div>
}