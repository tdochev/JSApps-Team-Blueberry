/* globals require, console, process */
'use strict';

let express = require('express');
let db = require('./data/db');

let app = express();
app.use(express.static('public'));

const port = process.env.PORT || 3001;


app.get('/api/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(db.getAllUsers()));
});

app.listen(port, () => console.log('Magic happens at port' + port));