const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./private-config/config.json', 'utf8'));

var authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).json({ msg: "No token! Authorization denied"});
    }
    try {
        const decoded = jwt.verify(token, config["jwtsecret"]);
        req.user = decoded.user;
        next();
        console.log("Yo")
    } catch (error) {
       res.status(401).json({ msg: "Token is not valid!" }); 
    }
};

module.exports = authenticate;