//imports acces token for jwt from .env file
// require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//need to put this secret key in a different file that is .gitignore-d
const jwt = require("jsonwebtoken");
const jwtExpirySeconds = 300;
const { Users, Items, Prices } = require("./models/index");

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get('/signup', (req, res) => {
 //req.body should include username, avatar and password
  Users.create(req.body)
    .then( (response) => res.send(response))
    .catch( (err) => {res.send(err)})
});

// IGDB API Get top 10 items by request by keyword
app.get(`/items`, (req, res) => {
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

app.listen(port, ()=> {
    console.log('listening in on port ', port);
})
