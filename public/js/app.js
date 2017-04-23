/* globals $, CryptoJS, jsonRequester */

(function() {
    'use strict';
    var $registerBtn = $('#btn-register');
    $registerBtn.on('click', function() {
        console.log('clicked');
        var username = $('#form-username').val().toLowerCase();
        var password = $('#form-password').val();
        var passHash = CryptoJS.SHA1(username + password).toString();

        var reqUser = {
            username: username,
            passHash: passHash
        };

        return jsonRequester.put('api/users', {
                data: reqUser
            })
            .then(function(resp) {
                var user = resp.result;
                return {
                    username: user.username
                };
            });
    });
}());