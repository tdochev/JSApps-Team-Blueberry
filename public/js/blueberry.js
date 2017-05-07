/* globals $, CryptoJS */

import 'jquery';
import 'bootstrap';
import toastr from 'toastr';
import CryptoJS from 'cryptojs';
import Sammy from 'sammy';
import * as validator from './utils/validator.js';
import * as requester from './utils/requester.js';
import HandlebarsTemplate from 'templates';

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


    this.get('#/signin', function() {
        var template = new HandlebarsTemplate();
        template.loadTemplate('signin').then(function(template) {
            $('#main-container').append(template());
        }).then(function() {
            var signInModal = $('#sign-in-modal');
            signInModal.modal('show');
            $('#btn-sign-in').on('click', function() {
                signInModal.modal('show');
            });
            $('#sign-in-modal').on('shown.bs.modal', function() {
                $('#sign-in-form-username').focus();
            });
            $('#form-sign-in').on('click', function() {
                var username = $('#sign-in-form-username').val().toLowerCase();
                var password = $('#sign-in-form-password').val();
                var passHash = CryptoJS.SHA1(username + password).toString();
                var user = {
                    username: username,
                    passHash: passHash
                };
                //console.log(user);
                requester.post('/api/auth', {
                    data: user
                }).then(function(resp) {
                    var loggerUser = resp.result.username;
                    var loggedAuthKey = resp.result.authKey;
                    localStorage.setItem('user', loggerUser);
                    localStorage.setItem('userAuthKey', loggedAuthKey);
                    $('#sign-in-modal').modal('hide');
                    $('#btn-sign-in').addClass('hidden');
                    $('#btn-register').addClass('hidden');
                    $('#btn-logout').removeClass('hidden');
                    window.location = '#/';
                    toastr.success(`You have logged in as: ${loggerUser}`);

                });
            });
        });
    });

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