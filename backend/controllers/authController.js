const db = require("./dbController");



function isAuthenticated(req, res, next) {
    if (req.user) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect to the main page
      //res.redirect('/login');
      res.redirect(process.env.REACT_APP_APILINK);
    }
}

async function checkUserProfile(email, name, role, admin){
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
              "INSERT INTO USERS(email, name, role_id, admin) VALUES (@email,@name, @role_id, @admin)";
              result = await db.excuteQuery(insertQuery, {
              email: email.toLowerCase(),
              name: name.toLowerCase(),
              role_id: role,
              admin: admin

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


//if set up like this other files can use it, like setting the function public 
module.exports = {isAuthenticated, checkUserProfile};