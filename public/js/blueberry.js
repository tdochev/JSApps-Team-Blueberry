/* globals $, CryptoJS */

import 'jquery';
import 'bootstrap';
import toastr from 'toastr';
import CryptoJS from 'cryptojs';
import * as validator from './utils/validator.js';
import * as requester from './utils/requester.js';

var $registerBtn = $('#btn-register');
$registerBtn.on('click', function() {
    var username = $('#form-username').val().toLowerCase();
    var password = $('#form-password').val();
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