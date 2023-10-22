const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const http = require("http");
//const { Server } = require("socket.io");
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const path = require("path");
require('dotenv').config();

const credentials = require('./credentials.json');
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
passport.use(new OAuth2Strategy({
    clientID: '777349805734-rf0n1qn4ltvgnrr9387hcusshupd0an1.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:4000/auth/google/callback', 
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
const pitchRoute = require("./routes/pitchesRoute");
const approvePitchRoute = require("./routes/approvePitchRoute");

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
    console.log(`User is trying to join room: ${roomName}`);
    socket.join(roomName);
    const socketId = socket.id;
    const roomPitches = pitchRoute.getPitches(roomName);
    if(roomPitches === null)
    {
      
    }else if (roomPitches != null){
      
      io.to(socketId).emit('existingPitches', roomPitches);
    }
  });

  socket.on('createPitch', (data) =>{
    pitchRoute.addPitch(data);
    io.in(data.room).emit('receivePitch', data);
  });

  socket.on('updatePitches', (room, data) =>{
    try{
      console.log("PITCH DATA IS",data);
      
      pitchRoute.updatePitch(data);
      //let updatedPitches = pitchRoute.getPitches(room);
      io.to(room).emit('receiveUpdatedPitches', data);

    }catch(e){
      console.log("error: ", e);
    }
  });

  socket.on('approvePitch', (room, data) =>{
    try{
      console.log("UPDATEDING THE STATUS ON SERVER: ", data);
      pitchRoute.approvePitch(data);
      io.to(room).emit('recieveApprovedPitch', data);
    }catch(e){
      console.log("error: ", e);
    }
  })

  socket.on('sendEmail', (email, data) => {
    console.log("should send email");
    const emailArray = data.data.groupMembers.map((member) => `${member.email} (${member.role})`);
    const commaSeparatedEmails = emailArray.join(', ');
    let members = commaSeparatedEmails
    approvePitchRoute.sendLoginEmail(email, data.data.name, data.data.disc, members);
  })

  socket.on('sendAdminEmail', (email, room) => {
    try{
      const roomPitches = pitchRoute.getPitches(room);
    
      let pitchInfo =  roomPitches.map((pitch) => ({
        name: pitch.name,
        disc: pitch.disc,
        members: pitch.groupMembers.map((member) => `${member.userName} role: ${member.role} email: ${member.email}`)
      }));
      console.log(pitchInfo);
      
      approvePitchRoute.sendEmailWithAttachment(email, pitchInfo);
    }catch(e){
      console.log("error with admin email: ", e);
    }
    
  })

  socket.on('removeGroupMember', (room, data) => {
    pitchRoute.updatePitch(data);
    socket.to(room).emit('receiveUpdatedPitches', data);
  })

  socket.on('deletePitch', (key, room)=> {
    console.log("DELETING PICTH! ", key )
    pitchRoute.deletePitch(key);
    socket.to(room).emit('updateDeletedPitch', key);
  })

  socket.on('endSession', (roomName, redirectRoute, bit) => {
    console.log("SOCKET CLOSING ROOM");
    pitchRoute.removePitchesFromRoom(roomName);
    const room = io.sockets.adapter.rooms.get(roomName);
    console.log(bit);
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

