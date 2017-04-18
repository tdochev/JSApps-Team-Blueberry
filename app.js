/* globals require, console*/
'use strict';

let express = require('express');
var app = express();

app.listen(3000, () => console.log('Magic happens at port 3000!'));