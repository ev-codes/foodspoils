var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
require('node-jsx').install({ extension: '.jsx', harmony: true });
var app = express();


app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));


var mysql = require('./mysql');
var routes = require('./routes/index');
var users = require('./routes/users');
var browserify = require('browserify');  
var jsx = require('node-jsx');  
var React = require('react/addons')
var components = require('./public/components.jsx')
var HelloMessage = React.createFactory(components.HelloMessage)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// receive post input
//app.use(express.bodyParser());
app.post('/', function(request, response){
  mysql.addEntry(request);
});

module.exports = app;
