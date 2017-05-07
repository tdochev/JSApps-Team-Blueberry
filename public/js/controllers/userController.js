import HandlebarsTemplate from 'templates';
import requester from 'requester';
import CryptoJS from 'cryptojs';

export default class userController {
    userSignIn() {
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

}