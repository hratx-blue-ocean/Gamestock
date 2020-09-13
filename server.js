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

<<<<<<< HEAD
=======
app.get('/signup', (req, res) => {
 //req.body should include username, avatar and password
  Users.create(req.body)
    .then( (response) => res.send(response))
    .catch( (err) => {res.send(err)})
});

>>>>>>> 160cce68054f88f74d5952d594d10fee4ac7a5f0
app.listen(port, ()=> {
    console.log('listening in on port ', port);
})