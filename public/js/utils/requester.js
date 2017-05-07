/* globals $, Promise */

export default class Requester {
    _send(method, url, options) {
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

    get(url, options) {
        return this._send('GET', url, options);
    }

    post(url, options) {
        return this._send('POST', url, options);
    }

    put(url, options) {
        return this._send('PUT', url, options);
    }

    del(url, options) {
        return this._send('POST', url, options);
    }
}