import Requester from 'requester';

var requester = new Requester();

export default class userController {

    getArtists() {
        console.log('Controller loaded!');
        var options = {
            headers: {
                'userAuthKey': localStorage.getItem('userAuthKey')
            }
        };
        console.log(options.headers);
        requester.get('/api/artists', options).then(function(resp) {
            console.log(resp);
        });
    }
}