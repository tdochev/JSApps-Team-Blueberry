/* globals $, CryptoJS, jsonRequester */

// Just for Validation
const Validator = {
    isNameCorrect: function(x) {
        if (typeof x !== 'string') {
            throw Error("Name should be a string");
        }
        if (x.length < 3) {
            throw Error("Name should be at least 3 signs")
        }
    },

    isPasswordCorrect: function(x) {
        if (typeof x !== 'string') {
            throw Error("Password should be a string");
        }
        if (x.length < 5) {
            throw Error("Password should be at least 5 signs")
        }
    }
};



(function() {
    'use strict';
    var $registerBtn = $('#btn-register');
    $registerBtn.on('click', function() {
        console.log('clicked');
        var username = $('#form-username').val().toLowerCase();
        var password = $('#form-password').val();
        var passHash = CryptoJS.SHA1(username + password).toString();

        Validator.isNameCorrect(username);
        Validator.isPasswordCorrect(password);

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