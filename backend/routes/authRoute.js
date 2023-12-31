var express = require("express");
const passport = require('passport');
const path = require("path");
const { join } = require("path");
const authRouter = express.Router();
let button = ""
const auth = require("../controllers/authController");
const jwt = require("../controllers/jwtController");
const profile = require("../routes/profileRoute");

authRouter.get('/', async function (req, res) {
  
});

authRouter.get('/google', passport.authenticate('google', { scope: ['email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
 async function (req, res) {
    // This function will be called when the user has authenticated successfully
    // You can access the user's profile data in `req.user`
    console.log('We got here');
    const redirectUrl = `${process.env.REACT_APP_APILINK}/main`
    //req.query.redirectUrl || 'http://localhost:3000/main'; 
    const userInfo = {
        email: req?.user.emails[0].value,
        name: req?.user.displayName ? req?.user.displayName: req?.user.emails[0].value,
        role: 1,
        admin: 0
    }
  
    const status = await auth.checkUserProfile(userInfo.email, userInfo.name, userInfo.role, userInfo.admin);

    try
    {
      let admin = await profile.getAdmin(userInfo.email);
      const token = await jwt.getToken(userInfo.email, admin);
      console.log("GOT TOKEM: ", token);
      res.redirect(redirectUrl + "?token=" + token);
    }
    catch (e)
    {
      console.log(e);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
    
  }
);

module.exports = authRouter;