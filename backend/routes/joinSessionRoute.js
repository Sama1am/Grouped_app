var express = require("express")
const path = require("path");
const { join } = require("path");
const joinSession = express.Router();
const auth = require("../controllers/authController");
const db = require("../controllers/dbController");

joinSession.get("/", auth.isAuthenticated,function (req, res) {
    //res.sendFile(path.join(__dirname, '../views/join.html'));
});

joinSession.post("/checkSession", async function (req, res) {
    try
    {
        let code = req.body?.code
        //console.log("WE HIT HER!");
        const query =
            "SELECT COUNT(*) AS count FROM SESSIONS WHERE session_code = @code AND active = @bit"
        let result = null;
        try {
            result = await db.excuteQuery(query, { code: code, bit: 1});
            //console.log("WE HIT HER!");
            console.log(result);
            if (result[0] && result[0].count === 1) {
                // Session exists and is active
                //console.log("WE HIT HER!");
                res.status(200).end();
            } else {
                // Session does not exist or is not active
                //console.log("WE HIT HER!");
                res.status(404).end();
            }
        } catch (e) {
            console.log("Catching a query with unexpected behavior: " + e);
            res.status(500).end();
        }
    }
    catch(e)
    {
        console.log("error when trying to check session code: " + e);
        res.status(500);
    }


});


//CHECK THIS!!!!
joinSession.post("/sessionResponse", async function(req, res) {
    try
    {
        let user = req.body.user;
        let session = req.body.session
        const insertQuery = "INSERT INTO SESSIONRESPONSE(user_id) VALUES (@user) WHERE session_id = @session";
        
        result = await db.excuteQuery(insertQuery, {
            user: user,
            session: session
        });

    }
    catch(e)
    {
        console.log("error: " + e);
    }
});



module.exports = joinSession;