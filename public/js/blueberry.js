/* globals $, CryptoJS */

import 'jquery';
import 'bootstrap';
import toastr from 'toastr';
import CryptoJS from 'cryptojs';
import Sammy from 'sammy';
import Validator from 'validator';
import Requester from 'requester';
import HandlebarsTemplate from 'templates';
import UserController from 'userController';

let userController = new UserController();

var app = Sammy(function() {
    'use strict';

    this.get('#/', function() {});

    this.get('#/logout', userController.userLogOut);

    this.get('#/signin', userController.userSignIn);

    this.get('#/register', userController.userRegister);

    this.get('#/artists', function() {
        console.log('Artist controller should go here!');
    });

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