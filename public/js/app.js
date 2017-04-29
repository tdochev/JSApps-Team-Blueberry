/* globals $, CryptoJS, jsonRequester */

(function() {
    'use strict';
    var $registerBtn = $('#btn-register');
    $registerBtn.on('click', function() {
        console.log('clicked');
        var username = $('#form-username').val().toLowerCase();
        var password = $('#form-password').val();
        var passHash = CryptoJS.SHA1(username + password).toString();

        validator.validateLen(username, 'username', 3);
        validator.validateLen(password, 'password', 6);

        var reqUser = {
            username: username,
            passHash: passHash
        };

        return jsonRequester.put('api/users', {
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
}());