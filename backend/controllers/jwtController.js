const jwt = require("jsonwebtoken");
let privateKey = null;
let publicKey = null;
let appURL = process.env.REACT_APP_APILINK

const getToken = async (user, admin) => {
  if (privateKey === null) {
    privateKey = Buffer.from(process.env.PRIVATEKEY, "base64").toString(
      "ascii"
    );
  }

  const signOptions = {
    issuer: "grouped",
    subject: "Auth",
    audience: "user",
    expiresIn: "1h",
    algorithm: "RS256",
  };

  const token = jwt.sign(
    { email: user, admin: admin },
    privateKey,
    signOptions // Include algorithm option here
  );
  return token;
};

const verifyToken = async (token) => {
  if (publicKey === null) {
    publicKey = Buffer.from(process.env.PUBLICKEY, "base64").toString("ascii");
  }

  const verifyOptions = {
    issuer: "grouped",
    subject: "Auth",
    audience: "user",
    expiresIn: "1h",
    algorithm: ["RS256"],
  };

  try {
    const decoded = jwt.verify(token, publicKey, verifyOptions);
    //replace later with better stuff
    if (decoded.iss === "grouped") {
      return decoded;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
  return false;
};

const getEmailFromToken = async (token) => {
  if (publicKey === null) {
    publicKey = Buffer.from(process.env.PUBLICKEY, "base64").toString("ascii");
  }

  const verifyOptions = {
    issuer: "grouped",
    subject: "Auth",
    audience: "user",
    expiresIn: "1h",
    algorithm: ["RS256"],
  };

  try {
    const decoded = jwt.verify(token, publicKey, verifyOptions);
    //replace later with better stuff
    if (decoded.iss === "grouped" && decoded.aud == "user") {
      return decoded.email;
    }
  } catch (error) {
    console.error("GETTING EMAIL FROM TOKEN FAILED:", error);
    return false;
  }
  return false;
};

const getAdminFromToken = async (token) => {
  if (publicKey === null) {
    publicKey = Buffer.from(process.env.PUBLICKEY, "base64").toString("ascii");
  }

  const verifyOptions = {
    issuer: "grouped",
    subject: "Auth",
    audience: "user",
    expiresIn: "1h",
    algorithm: ["RS256"],
  };

  try {
    const decoded = jwt.verify(token, publicKey, verifyOptions);
    //replace later with better stuff
    if (decoded.iss === "grouped" && decoded.aud == "user") {
      return decoded.admin;
    }
  } catch (error) {
    console.error("GETTING ADMIN FROM TOKEN FAILED:", error);
    return false;
  }
  return false;
};

const generateJwtLink = (token) => {
  const encodedToken = encodeURIComponent(token);
  const link = `${process.env.EMAILLINK}/login?token=${encodedToken}`;
  return link;
};

async function authenticateToken(req, res, next) {
    // Get the JWT token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token);
    // Check if the token is not provided
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Verify and decode the JWT token
    const info = await verifyToken(token)
    if(token){
        req.user = info;
  
      // Continue to the next middleware or route handler
        next();
    }
    else
    {
        return res.status(403).json({ message: 'Forbidden' });
    }
  
  }

module.exports = { getToken, verifyToken, generateJwtLink, getEmailFromToken, authenticateToken, getAdminFromToken };