/* globals require, console, process */
'use strict';

let express = require('express');
let MongoClient = require('mongodb').MongoClient;

let app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3001;
const dbURI = process.env.MONGODB || '';

// Connect to the db



app.get('/api/users', function(req, res) {
    MongoClient.connect('dbURI', function(err, db) {
        if (!err) {
            console.log('Connected to MLab!');
        }
        let temp = db.collection('users').find({}).toArray(function(err, docs) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(docs));
            db.close();
        });
    });
});



app.listen(port, () => console.log('Magic happens at port' + port));