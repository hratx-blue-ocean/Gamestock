require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = tokenAuthorizer = (req, res, next) => {
    const authHeader = req.headers['authorization']
    let token;
    authHeader ? token = authHeader.split(' ')[1] : token = null;
    if (!token) return res.sendStatus(401);


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)
        req.user = user;
        next();
    })

}