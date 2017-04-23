/* globals module, require, process, Promise */
module.exports = function() {
    'use strict';

    let MongoClient = require('mongodb').MongoClient;
    const dbURI = process.env.MONGODB || 'mongodb://127.0.0.1:27017/test';

    function getAllUsers() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbURI.toString()).then(db => {
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

    function addUser(user) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbURI.toString()).then(db => {
                db.collection('users').insert(user, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        db.close();
                        resolve(result);
                    }
                });
            });
        });
    }

    return {
        getAllUsers: getAllUsers,
        addUser: addUser
    };
};