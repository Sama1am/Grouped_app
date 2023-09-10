const socket = io();
const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
let nameInput = document.getElementById("name input");
const createBtn = document.getElementById("createProfileBtn");
let userName = ''


createBtn.addEventListener("click",function(){
    //check to see if input feilds are empty if not then create profile 

});

const pushProfile = async () => {
    const url = `${baseUrl}/session/createSession`;
    const postData = {
        userName: userName,
        
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