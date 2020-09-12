const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 7711;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=> {
    console.log('listening in on port ', port);
})