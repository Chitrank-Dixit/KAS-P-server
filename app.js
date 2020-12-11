var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// models
require('./models/User');

// get dotenv to set environment variables
require('dotenv').config();

var passport = require('passport');

// routes/urls
var auth = require('./routes/api/auth.routes');
var users = require('./routes/api/user.routes');


//import dummyData from './dummyData';
var serverConfig = require('./config');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true } ,(error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
    // feed some dummy data in DB.
    //dummyData();
  });
}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

require('./controllers/passport');
//require('./controllers/passport')(passport);
var router = express.Router();
router.use('/user', passport.authenticate('jwt', {session: false}), users);
router.use('/auth', auth);
//router.use('/t', test);
app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
