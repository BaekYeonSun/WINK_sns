import React from 'react';

export function Feed(props){
    return <>
        <div style={styles.feed}>
            <div>작성자 : {props.name}</div>
            <div>내용 : {props.body}</div>
        </div>
    </>;
}

const styles = {
    feed: {
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
        padding: '15px',
        margin: '15px',
        borderRadius: '10px',
    },
};