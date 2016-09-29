'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;
var Mongo_URI = process.env.Mongo_URI || 'mongodb://localhost:27017/clementinejs';

mongo.connect(Mongo_URI, function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

    routes(app, db);

    app.listen(port, function () {
        console.log('Listening on port 3000...');
    });

});