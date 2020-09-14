const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Users, Items, Prices } = require("./models/index");

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/signup", (req, res) => {
  //req.body should include username, avatar and password
  Users.create(req.body)
    .then((response) => res.send(response))
    .catch((err) => {
      res.send(err);
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
