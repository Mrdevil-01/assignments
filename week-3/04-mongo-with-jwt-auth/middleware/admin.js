const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../db");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const tokenDecode = token.split(" ")
    const verify = jwt.verify(tokenDecode[1],JWT_SECRET);

    if (verify.username) {
     next() 
    }
else{ 
    res.status(403).send("Admin not verified");
}
    

}

module.exports = adminMiddleware;