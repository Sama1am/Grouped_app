var express = require("express")
const path = require("path");
const { join } = require("path");
const sessionCreation = express.Router();
const auth = require("../controllers/authController");
const db = require("../controllers/dbController");


sessionCreation.get("/", auth.isAuthenticated,function (req, res) {
});

sessionCreation.post("/createSession", async function (req, res) {
    try
    {
        console.log(req.body);
        let sessionID = req.body.sessionCode;
        let moduleName = req.body.moduleName;

        //CHECK THIS!!!
        const insertQuery = `
            INSERT INTO SESSIONS(session_name, active, session_code) 
            VALUES (@session_name, @active, @session_code)
        `;
       
        result = await db.excuteQuery(insertQuery, {
            session_name: moduleName,
            active: 1,
            session_code: sessionID
        });
    }
    catch(err)
    {
        console.log("something went wrong with creating session: " + err);
    }
    
    
});

sessionCreation.post("/setActive", async function (req, res) {
    try
    {
        console.log("WE HIT HERE IN SETTING BIT")
        let sessionCode = req.body?.sessionCode;
        let bit = req.body?.bit;

        const insertQuery =
        "UPDATE SESSIONS SET active = @active WHERE session_code = @sessionCode ";

        result = await db.excuteQuery(insertQuery, {
            sessionCode: sessionCode,
            active: bit
        });
        console.log("WE HIT HERE IN SETTING BIT")
        console.log(result);
    }
    catch (err)
    {
        console.log("on error occured when changing role: " + err);
    }

})

async function setActiveBit(code, activeBit){
    try
    {
        console.log("WE HIT HERE IN SETTING BIT")
        let sessionCode = code;
        let bit = activeBit;

        const insertQuery =
        "UPDATE SESSIONS SET active = @active WHERE session_code = @sessionCode ";

        result = await db.excuteQuery(insertQuery, {
            sessionCode: sessionCode,
            active: bit
        });
        console.log("WE HIT HERE IN SETTING BIT")
        console.log(result);
    }
    catch (err)
    {
        console.log("on error occured when changing role: " + err);
    }
}

module.exports = {
    sessionCreation, 
    setActiveBit
};