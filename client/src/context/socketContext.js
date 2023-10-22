import { io } from 'socket.io-client';
const serverUrl = process.env.REACT_APP_APILINK;

export const socket = io(serverUrl, {transports: ['websocket', 'polling']});


