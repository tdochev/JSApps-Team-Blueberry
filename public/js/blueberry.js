/* globals $, CryptoJS */

import 'jquery';
import 'bootstrap';
import Sammy from 'sammy';
import UserController from 'userController';
import ArtistsController from 'artistsController';

let userController = new UserController();
let artistsController = new ArtistsController();

var app = Sammy(function() {
    'use strict';

    this.get('#/', function() {});

    this.get('#/logout', userController.userLogOut);

    this.get('#/signin', userController.userSignIn);

    this.get('#/register', userController.userRegister);

    this.get('#/artists', artistsController.getArtists);

    this.get('#/albums', function() {
        console.log('Albums controller should go here!');
    });

    this.get('#/songs', function() {
        console.log('Songs controller should go here!');
    });

});

// start the application
app.run('#/');

if (userController.hasUser()) {
    $('#btn-sign-in').addClass('hidden');
    $('#btn-register').addClass('hidden');
} else {
    $('#btn-logout').addClass('hidden');
}