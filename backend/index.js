const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const http = require("http");
//const { Server } = require("socket.io");
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const path = require("path");
require('dotenv').config();


const db = require('./controllers/dbController');


const port = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors());

//google Auth stuff
passport.use(new GoogleStrategy({
    clientID: '777349805734-rf0n1qn4ltvgnrr9387hcusshupd0an1.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:4000/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    //const email = profile.emails[0].value;
    // Store the email in your database or perform any other action
    done(null, profile);
    // Handle the user data returned by Google
    // and invoke the `done` callback
}));

passport.serializeUser((user, done) => {
    // Serialize the user ID or any other unique identifier
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    // Deserialize the user object using the ID
    // Retrieve the user from the database or any other storage
    const user = { id }; // Replace with your actual logic
    done(null, user);
});

app.use(session({
    secret: 'sfkbsbweufbkjbdcoiwe',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Routers section
const mainRouter = require("./routes/mainRoute");
const dashBoard = require("./routes/dashBoardRoute");
const sessionCreation = require("./routes/sessionCreationRoute");
const joinSession = require("./routes/joinSessionRoute");
const authRouter = require("./routes/authRoute");
const loginRoute = require("./routes/loginRoute");
const profileRoute = require('./routes/profileRoute');


app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/session", sessionCreation.sessionCreation);
app.use("/join", joinSession);
app.use("/dashBoard", dashBoard);
app.use("/login", loginRoute);
app.use("/profile", profileRoute.profileRoute);


app.use(express.static(__dirname + "/scripts/"));
app.use(express.static(__dirname + "/styling/")); 

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at http://${"127.0.0.1"}:${port}/`);
});

const io = socketIo(server,{
  cors: {
    origin: 'http://localhost:3000',
  }
});


io.on("connect", (socket) => {
  console.log("a user connected");
  console.log(socket.id);

  socket.on('joinRoom', (roomName) => {
    // socket.join(roomName);
    // console.log(`User joined room: ${roomName}`);
    console.log(`User is trying to join room: ${roomName}`);
    socket.join(roomName);
    console.log(`User joined room: ${roomName}`);
  });

  socket.on('sendMsg', (room, msg) => {
    console.log('GO SEND MESSAGE EMIT');
    io.in(room).emit('receiveMsg', msg);
    console.log("SHOULD HAVE SENT THE MESSAGE TO ROOM : " + room);
  });

  socket.on('createPitch', (data) =>{
    console.log(data);
    io.in(data.room).emit('receivePitch', data);
  });

  socket.on('endSession', (roomName, redirectRoute, bit) => {
    console.log("SOCKET CLOSING ROOM");
    const room = io.sockets.adapter.rooms.get(roomName);

    sessionCreation.setActiveBit(roomName, bit);

    console.log("GOT HERE WITH SOCKET!");

    if (room) {
      for (const socketId of room) {
        const socket = io.sockets.sockets.get(socketId);
        socket.leave(roomName);
        socket.emit('redirectUrl', redirectRoute);
      }
    }
  });

  socket.on("disconnect", async () => {
    console.log("user disconnected");
  });
});



//const io = new Server(server);




