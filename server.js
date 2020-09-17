//imports acces token for jwt from .env file
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const schedule = require("node-schedule");
const {
  getCollectionsByValueOrSize,
  saveItemToDB,
  getCollectionsByConsole,
  getAllConsoles,
  getCollectionByUser,
  getUserCollectionByName,
  getDailyItemPrice,
  getDailyCollectionValue,
  getUserByUsername,
} = require("./database/dbQueryHelpers");

// ebay API
let { ebayKey } = require("./eBay.config");
let eBay = require("ebay-node-api");

const jwt = require("jsonwebtoken");
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

app.post("/logout", (req, res) => {
  let token = req.cookies.token;

  res.clearCookie("token");
  res.redirect("/");
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
  console.log("WREQ DAT PARAMS: ", req.params);
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

// ebay api connection
let ebay = new eBay({
  clientID: ebayKey,
  marketplaceId: "EBAY_US",
});

// ebay api call to get item details based on item name selected by client
app.get(`/itemDetails/:item`, (req, res) => {
  let keywords = req.params.item;
  ebay
    .findItemsByKeywords({
      keywords: keywords,
      limit: 1,
      categoryId: "1249",
      pageNumber: 1,
      entriesPerPage: 1,
    })
    .then((data) => {
      // send thumbnail image
      res.status(200).send(data[0].searchResult[0].item[0]);
    })
    .catch((err) => console.log(err));
});

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
    thumbnail: req.body.thumbnail,
    front_view: req.body.front_view,
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
// get prices by date by item for graph

app.get("/prices/items", (req, res) => {
  getDailyItemPrice(req.query.itemID)
    .then((priceData) => {
      res.status(200).send(priceData);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Function to update Item Price everyday
// var updateDaily = schedule.scheduleJob("* * */11  * * *", function () {
//   Items.getAll({}).then((data) => {
//     const names = data.rows.map((row) => {
//       return axios
//         .get(
//           `https://www.pricecharting.com/api/products?t=36330d87343dc3b342b42a4f6c58b13e443061c8&q=${row.title}_?limit=10`
//         )
//         .then((res) => {
//           return Prices.create(
//             {
//               current_value: res.data.products[0]["new-price"],
//               date: new Date().toUTCString(),
//               item_id: row.id,
//             },
//             "RETURNING item_id, current_value"
//           );
//         });
//     });
//     return Promise.all(names);
//   });
// .then((array) => {
//   const updateTable = array.map((item) => {
//     Items.update(
//       {
//         id: item.item_id,
//       },
//       {
//         current_price: item.current_value,
//       }
//     );
//   });
// });
// get value of user collection by date for graph

app.get("/userCollectionValue", (req, res) => {
  getDailyCollectionValue(req.query.username)
    .then((collectionData) => {
      res.status(200).send(collectionData);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//get username from db & populate banner with information

app.get("/username/collectionValue", (req, res) => {
  getUserByUsername(req.query.username)
    .then((userID) => {
      return getCollectionByUser(userID.rows[0].id);
    })
    .then((userCollection) => {
      res.status(200).send(userCollection);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// handles refresh requests from the userProfile page or any other endpoint
app.get("/*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log("listening in on port ", port);
});
