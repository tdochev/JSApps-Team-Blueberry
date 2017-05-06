/* globals require, console, process */
'use strict';

let express = require('express');
let db = require('./data/db');
let data = db();
let bodyParser = require('body-parser');

let app = express();
app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;



function generateAuthKey(uniquePart) {
    const AUTH_KEY_LENGTH = 60,
        AUTH_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM';
    var authKey = uniquePart,
        index;
    while (authKey.length < AUTH_KEY_LENGTH) {
        index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
        authKey += AUTH_KEY_CHARS[index];
    }
    return authKey;
}


app.get('/api/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    data.getAllUsers().then(value => {
        res.send(JSON.stringify(value));
    }).catch(err => {
        console.log(err);
    });
});

app.put('/api/users', (req, res) => {
    let user = req.body;
    user.authKey = generateAuthKey(user.username);
    if (!user || typeof user.username !== 'string') {
        res.status(400)
            .json('Invalid user');
        return;
    }
    data.addUser(user)
        .then(() => {
            res.status(201)
                .json({
                    result: {
                        username: user.username
                    }
                });
        }).catch((error) => {
            res.status(400)
                .json({
                    result: error
                });
        });
});

// app.post('/api/auth', (req, res) => {
//     var reqUser = req.body;
//     var user = db('users').find({
//         usernameToLower: reqUser.username.toLowerCase()
//     });
//     if (!user || user.passHash !== reqUser.passHash) {
//         res.status(404)
//             .json('Invalid username or password');
//         return;
//     }

//     res.json({
//         result: {
//             username: user.username,
//             authKey: user.authKey
//         }
//     });
// });

app.listen(port, () => console.log('Magic happens at port ' + port));