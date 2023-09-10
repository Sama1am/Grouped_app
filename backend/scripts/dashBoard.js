const socket = io();


const queryParams = new URLSearchParams(window.location.search);
// Retrieve specific query parameter values
const sessionCode = queryParams.get('sessionCode'); // Returns "John"

socket.emit('joinRoom', sessionCode);
