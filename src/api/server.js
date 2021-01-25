let serverUri = 'http://ec2-52-78-131-251.ap-northeast-2.compute.amazonaws.com/';

export async function createFeed(name, body) {
    const result = await fetch(serverUri + '/feed/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: body,
            owner: name
        }),
    });
    console.log(await result.json());
    window.location.reload();
}

export async function readFeeds(){
    const feedResult = await fetch(serverUri + '/feed/', {
        method: 'GET',
    });
    return await feedResult.json();
}

export async function createToken(username, password){
    const response = await fetch(serverUri + '/api-token-auth/', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            username,
            password
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
    const response = await fetch(serverUri + '/user/', {
        method: 'get',
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
    while(!state){
        const response = await fetch(serverUri+'/user/'+id, {
            method: 'get',
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
    await fetch(serverUri+'/user/'+id, {
        method: 'put',
        mode: 'cors',
        headers: {
            'x-auth-token' : token,
            'Content-Type' : 'application/x-www-form-urlencoded',
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
    await fetch(serverUri+'/user/'+id, {
        method: 'delete'
    })
    .catch(err => console.log("DELETE error: ", err));
}