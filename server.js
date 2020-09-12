const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Users, Auth } = require('./database/index');

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/signup', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let avatar = req.body.avatar;

  Users.create({username, password, avatar})
    .then( (response) => res.send(response))
    .catch( (err) => {res.send(err)})
});

app.listen(port, ()=> {
    console.log('listening in on port ', port);
})
