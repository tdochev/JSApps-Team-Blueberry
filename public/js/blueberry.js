/* globals $, CryptoJS */

import 'jquery';
import 'bootstrap';
import toastr from 'toastr';
import CryptoJS from 'cryptojs';
import Sammy from 'sammy';
import * as validator from './utils/validator.js';
import requester from 'requester';
import HandlebarsTemplate from 'templates';
import UserController from 'userController';

let userController = new UserController();

var app = Sammy(function() {
    'use strict';

    this.get('#/', function() {
        console.log('main');
    });

    this.get('#/logout', userController.userLogOut);

    this.get('#/signin', userController.userSignIn);

    this.get('#/register', userController.userRegister);

});

// start the application
app.run('#/');