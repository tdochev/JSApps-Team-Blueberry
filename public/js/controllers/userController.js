/* globals $, toastr*/
import HandlebarsTemplate from 'templates';
import Requester from 'requester';
import CryptoJS from 'cryptojs';
import Validator from 'validator';
import toastr from 'toastr';

var signInModalCalled = 0;
var registerModal = 0;

var PASSWORD_MIN_LEN = 6;
var USERNAME_MIN_LEN = 6;

var requester = new Requester();
var validator = new Validator();

export default class userController {

    userSignIn() {
        var template = new HandlebarsTemplate();
        template.loadTemplate('signin').then(function(template) {
            if (!registerModal) {
                $('#main-container').append(template());
                registerModal += 1;
            }
        }).then(function() {
            $('#sign-in-modal').on('shown.bs.modal', function() {
                $('#sign-in-form-username').focus();
            });
            var signInModal = $('#sign-in-modal');
            signInModal.modal('show');
            $('#btn-sign-in').on('click', function() {
                signInModal.modal('show');
            });
            $('#form-sign-in').on('click', function() {
                var username = $('#sign-in-form-username').val().toLowerCase();
                var password = $('#sign-in-form-password').val();
                var passHash = CryptoJS.SHA1(username + password).toString();
                var user = {
                    username: username,
                    passHash: passHash
                };
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
    }

    userLogOut() {
        $('#btn-sign-in').removeClass('hidden');
        $('#btn-register').removeClass('hidden');
        $('#btn-logout').addClass('hidden');
        localStorage.removeItem('user');
        localStorage.removeItem('userAuthKey');
        toastr.success('You have successfuly loged out.');
        window.location = '#/';
    }

    userRegister() {
        var template = new HandlebarsTemplate();
        template.loadTemplate('register').then(function(template) {
            if (!signInModalCalled) {
                $('#main-container').append(template());
                signInModalCalled += 1;
            }
        }).then(function() {
            var registerModal = $('#register-modal');
            registerModal.modal('show');
            $('#btn-register').on('click', function() {
                registerModal.modal('show');
            });
            var $registerBtn = $('#form-register-btn');
            $registerBtn.on('click', function() {
                var username = $('#register-form-username').val().toLowerCase();
                var password = $('#register-form-password').val();
                var passHash = CryptoJS.SHA1(username + password).toString();

                if (!validator.validateLen(username, USERNAME_MIN_LEN)) {
                    toastr.error(`Username should be at least ${USERNAME_MIN_LEN} signs`);
                    return;
                }

                if (!validator.validateLen(password, PASSWORD_MIN_LEN)) {
                    toastr.error(`Password should be at least ${PASSWORD_MIN_LEN} signs`);
                    return;
                }

                var reqUser = {
                    username: username,
                    passHash: passHash,
                };

                return requester.put('api/users', {
                        data: reqUser
                    })
                    .then(function(resp) {
                        registerModal.modal('hide');
                        window.location = '#/';
                        var user = resp.result;
                        toastr.success(`User ${user.username} successfuly created.`);
                        return {
                            username: user.username
                        };
                    }).catch(function(reason) {
                        toastr.warning(reason.responseJSON.result);
                    });
            });
        });
    }

    hasUser() {
        return !!localStorage.getItem('user') &&
            !!localStorage.getItem('userAuthKey');
    }
}