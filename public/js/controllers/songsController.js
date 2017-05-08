/* globals $, localStorage */

import Requester from 'requester';
import HandlebarsTemplate from 'templates';
import toastr from 'toastr';;

var requester = new Requester();

export default class songController {
    getAllSongs() {
        var options = {
            headers: {
                'userAuthKey': localStorage.getItem('userAuthKey')
            }
        };

        requester.get('/api/artists', options).then(function(resp) {
            console.log(resp);
            var template = new HandlebarsTemplate();
            template.loadTemplate('songs').then(function(template) {
                $('#main-container').append(template(resp));
            });
        }).catch(function err() {
            console.log(err);
        });
    }
}