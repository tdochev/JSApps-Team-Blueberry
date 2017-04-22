/* globals module, require, process, console */
module.exports = function() {
    'use strict';

    let MongoClient = require('mongodb').MongoClient;
    const dbURI = process.env.MONGODB.toString() || 'Your local mongoDB URI';

    function getAllUsers() {
        MongoClient.connect(dbURI, (err, db) => {
            if (err) {
                console.log(err.message);
            }
            db.collection('users').find({}).toArray((err, rows) => {
                db.close();
                return rows;
            });
        });
    }

    return {
        getAllUsers: getAllUsers,
    };
};