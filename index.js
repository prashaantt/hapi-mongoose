'use strict';

var Hapi = require('hapi');
var port = 3000;
var appName = require('./package.json').name;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/'.concat(appName), function (error) {
  if (error) {
    console.error.bind(console, 'connection error');
  }
});

var server = new Hapi.Server();

server.connection({
  port: port
});

server.register({
  register: require('lout')
}, function (err) {
  console.log('error:' + err);
});

server.bind({
  db: mongoose.connection
});

server.route(require('./routes'));

server.views({
  engines: {
    mustache: require('hapi-hogan')
  },
  relativeTo: __dirname,
  path: './views',
  layoutPath: './views/layout',
  layout: false,
  helpersPath: './views/helpers',
  partialsPath: './views/partials'
});


server.start(function() {
  console.log(appName, "started @", server.info.uri);
});
