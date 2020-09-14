const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
<<<<<<< HEAD
const { Users, Auth } = require('./models/index');
=======
const { Users } = require('./models/index');
const { Crud } = require('./database/dbQueryHelpers');
>>>>>>> Modify /signup route.

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/signup', (req, res) => {
  //req.body should include username, avatar and password
  let username = req.body.username;
  
  //check if username exists
  Crud.get({username})
    .then((user) => {
      if (user) {
        res.status(200).send('Username already exists');
      } else {
        //if user does not exist, create one
        Users.create(req.body)
        .then((response) => {
          res.status(200).send(response)  
        })
        .catch( (err) => {
          console.log('Error creating user');
          res.status(500).send(err);
        })
      }
    })
    .catch((err) => {
      console.log('Error in server reading the user, line 40');
      res.status(500).send(err);
    })
});

app.listen(port, ()=> {
  console.log('listening in on port ', port);
});