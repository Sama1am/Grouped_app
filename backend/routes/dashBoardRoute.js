var express = require("express")
const path = require("path");
const { join } = require("path");
const dashBoard = express.Router();
const auth = require("../controllers/authController");

dashBoard.get("/", auth.isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, '../views/dashBoard.html'));
});

module.exports = dashBoard;