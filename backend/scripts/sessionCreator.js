const socket = io();
const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
const createBtn = document.getElementById("createSessionBtn");
const activeBtn = document.getElementById("changeActive");
let moduleInput = document.getElementById("module input");
let sessionCode = ""
let moduleName = ""

function generateCode(){
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 6; i++) {
        sessionCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return sessionCode;
}

createBtn.addEventListener("click",function(){
    generateCode();
    moduleName = moduleInput.value; 
    //window.location.replace('/session');

    pushSession();
    console.log('CODE IS: ' + sessionCode);
    console.log('MODULE NAME IS: ' + moduleName);
    let method = 'lecturer';
    let link = '/dashboard?method=${method}';
    window.location.href = link;
})

activeBtn.addEventListener("click",function(){
    let code = 'HS886R'
    let bit = 0
    pushActive(bit, code);
})

const pushSession = async () => {
    const url = `${baseUrl}/session/createSession`;
    const postData = {
        sessionCode: sessionCode,
        moduleName: moduleName,
        active: 1
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    };

    const data =  await fetch(url, requestOptions)
    console.log( await data.json());
}

const pushActive = async (bit, sessionCode) => {
    const url = `${baseUrl}/session/setActive`;
    const postData = {
        active: bit,
        sessionCode: sessionCode
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    };

    const data =  await fetch(url, requestOptions)
    console.log( await data.json());
}

function joinSession(sessionCode)
{
    socket.emit('joinRoom', sessionCode);
}