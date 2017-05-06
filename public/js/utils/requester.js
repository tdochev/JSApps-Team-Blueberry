/* globals $, Promise */
function send(method, url, options) {
    'use strict';
    options = options || {};

    var headers = options.headers || {},
        data = options.data || undefined;

    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            headers: headers,
            data: JSON.stringify(data),
            success: function(res) {
                resolve(res);
            },
            error: function(err) {
                reject(err);
            }
        });
    });
    return promise;
}

export function get(url, options) {
    return send('GET', url, options);
}

export function post(url, options) {
    return send('POST', url, options);
}

export function put(url, options) {
    return send('PUT', url, options);
}

export function del(url, options) {
    return send('POST', url, options);
}