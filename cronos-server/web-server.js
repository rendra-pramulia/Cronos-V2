/**
 * Created by rendra.pramulia on 9/16/2016.
 */

var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../');

app.use(express.static(rootPath + '/cronos-app'));

app.listen(4444);
console.log('Dijalankan pada port 4444......');