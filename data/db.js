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
                db.collection('users').find({
                    username: user.username.toLowerCase()
                }).toArray((error, rows) => {
                    if (rows.length > 0) {
                        db.close();
                        reject('This user already exists');
                    } else {
                        db.collection('users').insert(user, (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                db.close();
                                resolve(result);
                            }
                        });
                    }
                });
            });
        });
    }

    function getUserByUsername(username) {
        MongoClient.connect(dbURI.toString()).then(db => {
            db.collection('users').find({
                username: username
            }).toArray((error, rows) => {
                return (rows[0]);
            });
        });
    }

    function getUserByAuthKey(authKey) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbURI.toString()).then(db => {
                db.collection('users').find({
                    authKey: authKey
                }).toArray((error, rows) => {
                    resolve(rows[0]);
                    reject(error);
                });
            });
        });
    }

    function getAllArtists() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbURI.toString()).then(db => {
                db.collection('artists').find({}).toArray((error, rows) => {
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
        addUser: addUser,
        getUserByUsername: getUserByUsername,
        getUserByAuthKey: getUserByAuthKey,
        getAllArtists: getAllArtists
    };
};