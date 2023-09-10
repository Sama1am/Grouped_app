var express = require("express");
const passport = require('passport');
const path = require("path");
const { join } = require("path");
const loginRoute = express.Router();

loginRoute.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});


module.exports = loginRoute;