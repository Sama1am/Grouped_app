var express = require("express")
const path = require("path");
const { join } = require("path");
const mainRouter = express.Router();
const auth = require("../controllers/authController");

mainRouter.get("/", auth.isAuthenticated,function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

  module.exports = mainRouter;


   
