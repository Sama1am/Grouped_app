const sessionButton = document.getElementById("createSeesionBtn");
const joinButton = document.getElementById("joinSeesionBtn");
const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
const socket = io();

console.log(baseUrl);

sessionButton.addEventListener("click", async function(){
    window.location.replace('/session');
});

joinButton.addEventListener("click", async function(){
    window.location.replace('/join');
});


