var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("./configs/database");

var session = require("express-session");

var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');
var moviesRouter = require('./routes/movies');
var subscriptionsRouter = require('./routes/subscriptions');

var app = express();

//const dbURI = "mongodb+srv://liorsas:*****@cluster0.80kdp.mongodb.net/test?authSource=admin&replicaSet=atlas-mncsto-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set("menu",'./views/menu')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "my-secret" ,
rolling:true,
cookie:{
  //get session expires after 10 minutes
 // expires: 60000 *20
}
}))

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/menu', menuRouter);
app.use('/movies', moviesRouter);
app.use('/subscriptions', subscriptionsRouter);


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
