//imports acces token for jwt from .env file
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const {
  getCollectionsByValueOrSize,
  saveItemToDB,
  getCollectionsByConsole,
  getAllConsoles,
  getCollectionByUser,
  getUserCollectionByName,
} = require("./database/dbQueryHelpers");

const jwt = require("jsonwebtoken");
// const jwtExpirySeconds = 300;
const { Collections, Users, Items, Prices } = require("./models/index");
const tokenAuthorizer = require("./authorization/authorize.js");
const { runInContext } = require("vm");
const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
  console.log(req.body);
  let username = {
    username: req.body.username,
  };
  const token = jwt.sign(username.username, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  let userInfo;
  console.log("username", username);

  Users.get(username)
    .then((user) => {
      if (!user) {
        //username not found
        console.log("Username at login not found");
        res.status(200).send("User not found. Sign up!");
      } else {
        console.log("user: ", user);
        userInfo = user;
        //user exists, verify password
        return Users.compare(req.body.password, user.hashed_pw);
      }
      throw new Error();
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
        res.cookie("token", token);
        res.status(200).send(userInfo);
      }
    })
    .catch((err) => {
      console.log("Error. Could not log in user: ", err);
      res.status(500);
    });
});

app.post("/signup", (req, res) => {
  //req.body should include username, avatar and password
  let username = {
    username: req.body.username,
  };
  console.log(req.body);

  //check if username exists
  Users.get(username)
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
    });
});

// app.get('/test', tokenAuthorizer, (req, res) => {
//   const token = req.cookies
//   console.log('THIS IS THE TOKEN:',token);

//   res.send(token);
// })

// MAIN USER PROFILE ROUTE
app.get("/userProfile/:username", (req, res) => {
  // console.log("WRECK DAT PARAMS: ", req.params.username);
  getUserCollectionByName(req.params.username)
    .then((response) => res.send(response))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// user profile route
// app.get("/userProfile/items", (req, res) => {
//   Items.getAll()
//     .then((response) => res.send(response))
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// user profile route
// app.get("/userProfile/prices", (req, res) => {
//   Prices.getAll()
//     .then((response) => res.send(response))
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// user profile route
// app.get("/userProfile/collectionItems", (req, res) => {
//   Collections.getAll()
//     .then((response) => res.send(response))
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// API route to get item price
app.get("/getItemPrice", (req, res) => {
  const itemName = req.query.items;
  axios
    .get(
      `https://www.pricecharting.com/api/products?t=36330d87343dc3b342b42a4f6c58b13e443061c8&q=${itemName}_?limit=10`
    )
    .then((response) => {
      res.send(response.data.products);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Routes for leaderboard

//get leaderboard by collection value
app.get("/leaderboard/value", (req, res) => {
  getCollectionsByValueOrSize("total_value DESC, total_count")
    .then((records) => {
      res.status(200).send(records);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// get leaderboard by collection size
app.get("/leaderboard/size", (req, res) => {
  getCollectionsByValueOrSize("total_count DESC, total_value")
    .then((records) => {
      res.status(200).send(records);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});
// IGDB API Get top 10 items by request by keyword
// app.get(`/getItemDetails`, (req, res) => {
//   let query = req.query.items;
//   axios({
//     url: `https://api-v3.igdb.com/games/?search=${query}&fields=name,platforms,cover,summary`,
//     method: 'POST',
//     headers: {
//         'user-key': IGDBkey
//     }
//   })
//     .then(response => {
//         res.status(200).send(response.data);
//         console.log(response.data)
//     })
//     .catch((err) => {
//       console.log(`Error retrieving data from IGDB`);
//       res.status(500);
//     });
// });

// save item to the database
app.post(`/saveItems`, (req, res) => {
  let itemData = {
    title: req.body.title,
    console: req.body.console,
    is_console: req.body.is_console,
    user_id: req.body.user_id,
    condition: req.body.condition,
    comments: req.body.comments,
    starting_price: req.body.starting_price,
    date_of_purchase: req.body.date_of_purchase,
    tradeable: req.body.tradeable,
    current_value: req.body.current_value,
  };
  saveItemToDB(itemData)
    .then((response) => {
      res.status(200).send(response);
      console.log(`Success saving item to database`);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(`Error saving item to database`);
    });
});

// get leaderboard by consoles
app.get("/leaderboard/console", (req, res) => {
  getCollectionsByConsole(req.query.console)
    .then((records) => {
      res.status(200).send(records);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// get all consoles to filter leaderboard on
app.get("/consoles", (req, res) => {
  getAllConsoles()
    .then((consoles) => {
      res.status(200).send(consoles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// get collection by user ID
app.get("/collection/user", (req, res) => {
  getCollectionByUser(req.query.userID)
    .then((collection) => {
      res.status(200).send(collection);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/checkLoginStatus", tokenAuthorizer, (req, res) => {
  console.log("checking worked!");
  Users.get({ username: req.user })
    .then((results) => {
      console.log("got results, ", results);
      const user = {
        username: results.username,
        id: results.id,
      };
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// handles refresh requests from the userProfile page or any other endpoint *** BROKEN ***
app.use("/*", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("listening in on port ", port);
});
