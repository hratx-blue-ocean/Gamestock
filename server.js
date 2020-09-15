<<<<<<< HEAD
=======
//imports acces token for jwt from .env file
// require("dotenv").config();

>>>>>>> eb01c7e497d0f28c53b775f10f52675b6cc9ca0b
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
=======

//need to put this secret key in a different file that is .gitignore-d
const jwt = require("jsonwebtoken");
const jwtExpirySeconds = 300;
>>>>>>> eb01c7e497d0f28c53b775f10f52675b6cc9ca0b
const { Users, Items, Prices } = require("./models/index");

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
<<<<<<< HEAD

app.get("/signup", (req, res) => {
  //req.body should include username, avatar and password
  Users.create(req.body)
    .then((response) => res.send(response))
    .catch((err) => {
      res.send(err);
=======

app.get("/login", (req, res) => {
  let username = req.body.username;
  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  Users.get({ username })
    .then((user) => {
      if (!user) {
        //username not found
        console.log("Username at login not found");
        res.status(200).send("User not found. Sign up");
      } else {
        //user exists, verify password
        return Users.compare(req.body.password, user.hash);
      }
    })
    .then((verification) => {
      //user exists but entered incorrect password
      if (!verification) {
        console.log("Incorrect password entered");
        res.status(401).send("Incorrect password entered, try again");
      } else {
        //user entered the correct password
        console.log("User can log in");

        //create auth cookie
        console.log("token:", token);
        res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
        res.status(200).send("Successful login");
      }
    })
    .catch((err) => {
      console.log("Error. Could not log in user: ", err);
      res.status(500);
    });
});

app.get("/signup", (req, res) => {
  //req.body should include username, avatar and password
  let username = req.body.username;

  //check if username exists
  Users.get({ username })
    .then((user) => {
      if (user) {
        res.status(200).send("Username already exists");
      } else {
        //if user does not exist, create one
        Users.create(req.body)
          .then((response) => {
            res.status(200).send(response);
          })
          .catch((err) => {
            console.log("Error creating user", err);
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      console.log("Error in server reading username: ", err);
      res.status(500).send(err);
>>>>>>> eb01c7e497d0f28c53b775f10f52675b6cc9ca0b
    });
});

// user profile route
app.get("/userProfile/items", (req, res) => {
  Items.getAll()
    .then((response) => res.send(response))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// user profile route
app.get("/userProfile/prices", (req, res) => {
  Prices.getAll()
    .then((response) => res.send(response))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// user profile route
app.get("/userProfile/users", (req, res) => {
  Users.getAll()
    .then((response) => res.send(response))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log("listening in on port ", port);
});
