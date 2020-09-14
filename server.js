const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Users, Auth } = require('./models/index');
const axios = require('axios');

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/signup', (req, res) => {
 //req.body should include username, avatar and password
  Users.create(req.body)
    .then( (response) => res.send(response))
    .catch( (err) => {res.send(err)})
});

app.get('/signup', (req, res) => {
 //req.body should include username, avatar and password
  Users.create(req.body)
    .then( (response) => res.send(response))
    .catch( (err) => {res.send(err)})
});

// IGDB API Get request by keyword
app.get(`/items`, (req, res) => {
  let query = req.body;
  axios({
    url: `https://api-v3.igdb.com/games/?search=${query}&fields=name,platforms,cover,artworks,summary`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': '541e9d80b705762700e39809d4d12ea8'
    }
  })
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(err => {
        console.error(err);
    });
})

app.listen(port, ()=> {
    console.log('listening in on port ', port);
})