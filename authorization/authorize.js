require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = tokenAuthorizer = (req, res, next) => {
  console.log("middleWARE!");
  let token;
  if (req.cookies) {
    token = req.cookies.token;
  } else {
    return res.sendStatus(401);
  }
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    req.user = user;
    next();
  });
};
