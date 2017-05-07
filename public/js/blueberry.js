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

    // define a 'route'
    'use strict';

    this.get('#/', function() {
        console.log('main');
    });

    this.get('#/logout', function() {
        $('#btn-sign-in').removeClass('hidden');
        $('#btn-register').removeClass('hidden');
        $('#btn-logout').addClass('hidden');
        localStorage.removeItem('user');
        localStorage.removeItem('userAuthKey');
        toastr.success('You have successfuly loged out.')
        window.location = '#/';
    });


    this.get('#/signin', userController.userSignIn);

    this.get('#/register', function() {
        // var $registerBtn = $('#btn-register');
        // $registerBtn.on('click', function() {
        //     var username = $('#form-username').val().toLowerCase();
        //     var password = $('#form-password').val();
        //     var passHash = CryptoJS.SHA1(username + password).toString();

        //     validator.validateLen(username, 'username', 3);
        //     validator.validateLen(password, 'password', 6);

        //     var reqUser = {
        //         username: username,
        //         passHash: passHash
        //     };

        //     return requester.put('api/users', {
        //             data: reqUser
        //         })
        //         .then(function(resp) {
        //             var user = resp.result;
        //             //move messages to a module
        //             toastr.success(`User ${user.username} successfuly created.`);
        //             return {
        //                 username: user.username
        //             };
        //         }).catch(function(reason) {
        //             toastr.warning(reason.responseJSON.result);
        //         });
        // });
    });
});
// start the application
app.run('#/');