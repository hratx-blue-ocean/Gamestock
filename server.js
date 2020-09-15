//imports acces token for jwt from .env file
// require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//need to put this secret key in a different file that is .gitignore-d
// const jwt = require("jsonwebtoken");
// const jwtExpirySeconds = 300;
const { Users, Items, Prices } = require("./models/index");

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// app.get("/login", (req, res) => {
//   let username = req.body.username;
//   const token = jwt.sign({ username }, process.env.ACCESS_TOKEN, {
//     algorithm: 'HS256'
//   });

//   Users.get({ username })
//     .then((user) => {
//       if (!user) {
//         //username not found
//         console.log("Username at login not found");
//         res.status(200).send("User not found. Sign up");
//       } else {
//         //user exists, verify password
//         return Users.compare(req.body.password, user.hash);
//       }
//     })
//     .then((verification) => {
//       //user exists but entered incorrect password
//       if (!verification) {
//         console.log("Incorrect password entered");
//         res.status(401).send("Incorrect password entered, try again");
//       } else {
//         //user entered the correct password
//         console.log("User can log in");

//         //create auth cookie
//         console.log("token:", token);
//         res.cookie('token', token);
//         res.status(200).send('Successful login');
//       }
//     })
//     .catch((err) => {
//       console.log(`Error retrieving data from IGDB`);
//       res.status(500);
//     });
// });

// IGDB API Get top 10 items by request by keyword
app.get(`IGDB/items`, (req, res) => {
  let query = req.body;
  axios({
    url: `https://api-v3.igdb.com/games/?search=${query}&fields=name,platforms,cover,summary`,
    method: 'POST',
    headers: {
        'user-key': IGDBkey
    }
  })
    .then(response => {
        res.status(200).send(response.data);
        console.log(response.data)
    })
    .catch((err) => {
      console.log(`Error retrieving data from IGDB`);
      res.status(500);
    });
});

// app.get(`/itemImage`, (req, res) => {
//   axios({
//     url: `https://api-v3.igdb.com/covers/?fields=alpha_channel,animated,checksum,game,height,image_id,url,width`,
//     method: 'POST',
//     headers: {
//         'user-key': IGDBkey,
//         'content-type': 'text/plain'
//     }
//   })
//     .then(response => {
//         res.status(200).send(response.data);
//         console.log(response.data)
//     })
//     .catch(err => {
//         console.error(err);
//     });
// })

app.post(`/saveItems`, (req, res) => {
  let itemData = {
    user_id: req.body.user_id,
    condition: req.body.condition,
    comments: req.body.comments,
    starting_price: req.body.starting_price,
    date_of_purchase: req.body.date_of_purchase,
    tradeable: req.body.tradeable,
    title: req.body.title,
    console: req.body.console,
    is_console: req.body.is_console
  }
})

app.listen(port, ()=> {
    console.log('listening in on port ', port);
})
