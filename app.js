/* globals require, console, process */
'use strict';

let express = require('express');
let db = require('./data/db');
let bodyParser = require('body-parser');

let app = express();
app.use(express.static('public'));

const port = process.env.PORT || 3001;


app.get('/api/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(db.getAllUsers));
});

app.post('/api/users', (req, res) => {
    let user = req.body;
    if (!user || typeof user.username !== 'string') {
        res.status(400)
            .json('Invalid user');
        return;
    }

    user.usernameToLower = user.username.toLowerCase();
    db.addUser(user);
    res.status(201)
        .json({
            result: {
                username: user.username
            }
        });
});


app.listen(port, () => console.log('Magic happens at port ' + port));