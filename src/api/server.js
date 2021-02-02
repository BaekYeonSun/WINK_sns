let serverUri = 'https://react-js-sample-api.kmuwink.net';

export async function createFeed(body) {
    const token = localStorage.getItem('token');
    const result = await fetch(serverUri + '/feed/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
        },
        body: JSON.stringify({
            content: body,
        }),
    });
    console.log(await result.json());
    window.location.reload();
}

export async function readFeeds(){
    const token = localStorage.getItem('token');
    const feedResult = await fetch(serverUri + '/feed/', {
        method: 'GET',
        headers: {
            'Authorization' : 'Token ' + token,
        },
    });
    return await feedResult.json();
}

export async function deleteFeed(id){
    const token = localStorage.getItem('token');
    await fetch(serverUri + '/feed/' + id,{
        method: 'Delete',
        headers: {
            'Authorization' : 'Token ' + token,
        },
    });
    window.location.reload();
}

export async function readPost(id){
    let postInfo = {};
    const token = localStorage.getItem('token');
    await fetch(serverUri + '/feed/' + id,{
        method: 'GET',
        headers: {
            'Authorization' : 'Token ' + token,
        },
    }).then(response => response.json())
    .then(response => postInfo = response);
    return {
        id: postInfo.id,
        username: postInfo.owner,
        content: postInfo.content
    };
}

export async function createComment(id, content) {
    const token = localStorage.getItem('token');
    const result = await fetch(serverUri + '/feed/' + id  + '/comment/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
        },
        body: JSON.stringify({
            content: content,
        }),
    });
    console.log(await result.json());
    window.location.reload();
}

export async function readComments(id){
    const token = localStorage.getItem('token');
    const feedResult = await fetch(serverUri + '/feed/' + id + '/comment/', {
        method: 'GET',
        headers: {
            'Authorization' : 'Token ' + token,
        }
    });
    return await feedResult.json();
}

export async function deleteComment(id){
    const token = localStorage.getItem('token');
    await fetch(serverUri + '/feed/' + localStorage.getItem('postID') + '/comment/' + id,{
        method: 'Delete',
        headers: {
            'Authorization' : 'Token ' + token,
        },
    });
    window.location.reload();
}

export async function updateComment(id, content){
    const token = localStorage.getItem('token');
    await fetch(serverUri + '/feed/' + localStorage.getItem('postID') + '/comment/' + id, {
        method: 'put',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token,
        },
        body: JSON.stringify({
            content: content,
        })
    })
    .catch(err => console.log("PUT error: ", err));
}

export async function createToken(username, password){
    const response = await fetch(serverUri + '/api-token-auth/', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    });
    return await response.json();
}

export async function createUser(username, email, password, last_name, first_name){
    const response = await fetch(serverUri + '/user/', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            last_name: last_name,
            first_name: first_name
        }),
    });
    return await response.json();
}

async function readUsers(){
    const token = localStorage.getItem('token');
    const response = await fetch(serverUri + '/user/', {
        method: 'get',
        headers: {
            'Authorization' : token,
        }
    }).then(response => response.json());
    for(let i = 0; i<response.length; i++){
        if(localStorage.getItem('username') === response[i].username){
            // URL = 'http://ec2-52-78-131-251.ap-northeast-2.compute.amazonaws.com/user/' + (i+1);
            // console.log(URL);
            // return URL;
            return i+1;
        }
    }
}

export async function readUserInfo(){
    let id = await readUsers();
    let state = false;
    let userInfo = {};
    const token = localStorage.getItem('token');
    while(!state){
        const response = await fetch(serverUri + '/user/' + id, {
            method: 'get',
            headers: {
                'Authorization' : token,
            }
        }).then(response => response.json());
        // console.log(response);
        if(localStorage.getItem('username') !== response.username){
            id++;
        }
        else{
            state = true;
            userInfo = response;
            localStorage.setItem('id', id);
        }
    }
    return {
        username: userInfo.username,
        email: userInfo.email,
        last_name: userInfo.last_name,
        first_name: userInfo.first_name
    };
}

export async function updateUser(username, password, email, last_name, first_name){
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    await fetch(serverUri + '/user/' + id, {
        method: 'put',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            last_name: last_name,
            first_name: first_name
        }),
    })
    .catch(err => console.log("PUT error: ", err));
}

export async function deleteUser(){
    let id = localStorage.getItem('id');
    await fetch(serverUri + '/user/' + id, {
        method: 'delete'
    })
    .catch(err => console.log("DELETE error: ", err));
}