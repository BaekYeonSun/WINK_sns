import React, { useState } from 'react';
import '../Write.css';
import { Link } from "react-router-dom";

export function PostWrite(props){
    const [state, setState] = useState({
        content: '',
    })

    const getValue = e => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleClick = () => {
        // console.log("내용 : ", state.content);
        props.writeFunc(state.content);
        setState({
            content: ''
        })
    }

    return <div id={"wrap"}>
        <div id={"wrapComponent"}>
            <div id={"component"}>
                <label>작성자 : {localStorage.getItem('username')}</label>
            </div>
            <div id={"component"}>
                {/*<label>내용</label>*/}
                <textarea name="content" id={"content"} cols = {"30"} rols = {"10"} value={state.content} placeholder={"input the contents"} onChange={getValue}/>
            </div>
            <div id={"wrapBtn"}>
                <Link to={"./MyPage"}>
                    <button id={"btn"}>MYPAGE</button>
                </Link>
                <button id={"btn"} onClick={handleClick}>POST</button>
            </div>
        </div>
    </div>
}