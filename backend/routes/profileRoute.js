var express = require("express")
const path = require("path");
const { join } = require("path");
const profileRoute = express.Router();
const db = require("../controllers/dbController");
const sql = require('mssql');
const auth = require("../controllers/authController");
const jwt = require("../controllers/jwtController");

//PUT IN AUTH.ISAUTHENTICATED

profileRoute.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../views/profileCreation.html'));
});

async function checkUserProfile(email, name, role){
    try
    {
        const query =
            "SELECT COUNT(*) AS count FROM USERS WHERE email = @email";
        let result = null;
        try {
            result = await db.excuteQuery(query, { email: email.toLowerCase()});
            console.log(result);
            if (result[0]) {
            if (result[0].count === 0) {
                const insertQuery =
                "INSERT INTO USERS(email, name, role_id) VALUES (@email,@name, @role_id)";
                result = await db.excuteQuery(insertQuery, {
                email: email.toLowerCase(),
                name: name.toLowerCase(),
                role_id: role
                });
                return true;
            }
            }
            return false;
        } catch (e) {
            console.log("Catching a query with unexpected behavior: " + e);
            return false;
        }
    }
    catch (err)
    {
        console.log('error occured when adding user: ' + err);
        return false;
    }
}

profileRoute.post("/updateProfile", jwt.authenticateToken, async function (req, res){
    try
    {
        let role = req.body?.role;
        let name = req.body?.name;
        let email = req.user?.email;
        let studentNumber = req.body?.studentNumber;
        console.log("STUDENT NUMBER: ", req.body?.studentNumber);

        if(!email)
        {
            res.status(403);
        }
            
        if(name)
        {
            changeName(name, email);
        }

        if(role)
        {
            changeRole(role, email);
        }

        if(studentNumber){
            console.log("SETTING STUDENT NUMBER ON DB");
            setStudentNumber(studentNumber, email);
        }
        
    }
    catch(e)
    {
        console.log("Error when creating profile: " + e);
    }
});

profileRoute.get("/getRoles", async function (req, res) {
    try{
        const query = "SELECT name FROM ROLES";

        const result = await db.executeGet(query);
        res.json(result);
        console.log(result);
    }
    catch (e){
        console.log(e);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

profileRoute.get("/getAdmin", jwt.authenticateToken, async function (req, res){
    try
    {
        let admin = req.user?.admin;
        
        if(admin === true)
        {
            //res.status(200).end();
            res.status(200).json({ isAdmin: true });
        }
        else if(admin === false)
        {
            //res.status(404).end();
            res.status(200).json({ isAdmin: false });
        }
    }
    catch(e)
    {
        console.log('error when getting admin', e);
    }
});

profileRoute.get('/getEmail', jwt.authenticateToken, async function (req, res){
    try{
        let email = req.user?.email;
        res.json(email);
    }
    catch(e)
    {
        console.log('error when getting email', e);
    }
})


const getAdmin = async (email) => {
    try{
        const query = "SELECT admin FROM USERS WHERE email = @email";

        result = await db.excuteQuery(query, {
            email: email.toLowerCase(),
        });
        
        let adminValue = result[0].admin;
        return adminValue;
    }
    catch (e){
        console.log(e);
    }
}

//CHECK THIS!!!!
async function changeRole(role, email){
    try
    {
       
        const updateStatement = `
        UPDATE USERS
        SET role_id = @role
        WHERE email = @email;
        `;

        result = await db.excuteQuery(updateStatement, {
            role: role,
            email: email
        });
    }
    catch (err)
    {
        console.log("on error occured when changing role: " + err);
    }
}

//CHECK THIS!!
async function changeName(name, email){
    try
    {
        const updateStatement = `
        UPDATE USERS
        SET name = @name
        WHERE email = @email;
        `;

        result = await db.excuteQuery(updateStatement, {
            name: name,
            email: email
        });
    }
    catch (err)
    {
        console.log("on error occured when changing name: " + err);
    }
}

async function setStudentNumber(studentNumber, email){
    try
    {
        const updateStatement = `
        UPDATE USERS
        SET student_number = @student_number
        WHERE email = @email;
        `;

        result = await db.excuteQuery(updateStatement, {
            student_number: studentNumber,
            email: email
        });
        
        console.log("RESULT IS : ", result);
    }
    catch (err)
    {
        console.log("on error occured when changing student: " + err);
    }
}

function sliceEmail(email)
{
    try
    {
        if (typeof email !== 'string') {
            throw new Error('Input must be a string');
        }
    
        const atIndex = email.indexOf('@');
        if (atIndex === -1 || email.slice(atIndex) !== '@gmail.com') {
            throw new Error('Invalid email format');
        }
    
        const username = email.slice(0, atIndex);
        return username;
    }
    catch (e)
    {
        console.log("ERROR WITH SLICING EMAIL: " + e);
    }
   
}

module.exports = {
    profileRoute, 
    getAdmin, 
    checkUserProfile, 
    changeRole, 
    changeName, 
    sliceEmail
};