/* globals module, require, process, Promise */
module.exports = function() {
    'use strict';

    let MongoClient = require('mongodb').MongoClient;
    const dbURI = process.env.MONGODB || 'mongodb://127.0.0.1:27017/test';

    function getAllUsers() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbURI.toString(), (err, db) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(db);
                }
            });
        }).then(db => {
            return new Promise((resolve, reject) => {
                db.collection('users').find({}).toArray((error, rows) => {
                    if (error) {
                        reject(error);
                    } else {
                        db.close();
                        resolve(rows);
                    }
                });
            });
        });
    }

    return {
        getAllUsers: getAllUsers,
    };
};