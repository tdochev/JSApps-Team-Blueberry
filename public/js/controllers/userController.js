/* globals $, toastr*/
import HandlebarsTemplate from 'templates';
import requester from 'requester';
import CryptoJS from 'cryptojs';

var _signInModalCalled = 0;
var _registerModal = 0;

export default class userController {

    userSignIn() {
        console.log(_signInModalCalled);
        var template = new HandlebarsTemplate();
        template.loadTemplate('signin').then(function(template) {
            if (!_registerModal) {
                $('#main-container').append(template());
                _registerModal += 1;
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
        toastr.success('You have successfuly loged out.')
        window.location = '#/';
    }

    userRegister() {
        var template = new HandlebarsTemplate();
        template.loadTemplate('register').then(function(template) {
            if (!_signInModalCalled) {
                $('#main-container').append(template());
                _signInModalCalled += 1;
            }
        }).then(function() {
            var registerModal = $('#register-modal');
            registerModal.modal('show');
            var $registerBtn = $('#form-register-btn');
            $registerBtn.on('click', function() {
                var username = $('#register-form-username').val().toLowerCase();
                var password = $('#register-form-password').val();
                var passHash = CryptoJS.SHA1(username + password).toString();

                validator.validateLen(username, 'username', 3);
                validator.validateLen(password, 'password', 6);

                var reqUser = {
                    username: username,
                    passHash: passHash
                };

                return requester.put('api/users', {
                        data: reqUser
                    })
                    .then(function(resp) {
                        var user = resp.result;
                        //move messages to a module
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
}