/* globals $, CryptoJS */

import 'jquery';
import 'bootstrap';
import Sammy from 'sammy';
import UserController from 'userController';
import ArtistsController from 'artistsController';
import SongsController from 'songsController';

let userController = new UserController();
let artistsController = new ArtistsController();
let songsController = new SongsController();

var app = Sammy(function() {
    'use strict';

    this.get('#/', function() {});

    this.get('#/logout', userController.userLogOut);

    this.get('#/signin', userController.userSignIn);

    this.get('#/register', userController.userRegister);

    this.get('#/artists', artistsController.getArtists);

    this.get('#/songs', songsController.getAllSongs);

    this.get('#/albums', albumsController.getAlbum);
});

// start the application
app.run('#/');

if (userController.hasUser()) {
    $('#btn-sign-in').addClass('hidden');
    $('#btn-register').addClass('hidden');
} else {
    $('#btn-logout').addClass('hidden');
}