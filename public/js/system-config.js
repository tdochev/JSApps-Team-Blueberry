System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        'text': 'libs/systemjs-plugin-text/text.js',

        // App files
        'blueberry': 'js/blueberry.js',

        // Templates
        // 'homeTemplate': 'templates/home.handlebars',

        // Library files
        'jquery': 'libs/jquery/dist/jquery.min.js',
        'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min.js',
        //'sammy': 'libs/sammy/lib/min/sammy-latest.min.js',
        //'handlebars': 'libs/handlebars/dist/handlebars.min.js',
        'cryptojs': 'libs/crypto-js/crypto-js.js',
        'toastr': 'libs/toastr/build/toastr.min.js'
    }
});

System.import('blueberry');