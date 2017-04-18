/* globals require, console, process */
'use strict';

let express = require('express');
var app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log('Magic happens at port' + port));