const {Admin} = require("../db/index") ;
const z = require("zod");
const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    const usernameResponse = emailSchema.safeParse(username);
    const passResponse = passwordSchema.safeParse(password);
    if (!usernameResponse.success || !passResponse.success) {
        res.status(403).send("invalid username or password");
      }else{
        const value = await Admin.findOne({
        username,
        password
    })
    if(value){
        next()
    } else {
        res.send("invalid credentials");
    }
}
    

}

module.exports = adminMiddleware;