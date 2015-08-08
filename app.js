var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')

  , routes = require('./routes/index')
  , users = require('./routes/users')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  //, SessionStore = require("session-mongoose")(express)
  //引入mongoose模块
  , mongoose = require('mongoose')
  //引入自定义的数据库配置模块
  , config = require('./config')

  , app = express();


  mongoose.connect(config.db.mongodb);

// 环境变量 view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// var store = new SessionStore({
//   url: "mongodb://localhost/session",
//   interval: 12000
// })

// error handlers

// 开发模式 development error handler
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

app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

/*
 * Express3.0 的配置方法 编号001
 app.get('/', routes.index);
  app.get('/login', routes.login);
  app.post('/login', routes.doLogin);
  app.get('/logout', routes.logout);
  app.get('/home', routes.home);
  get为get请求，post为post请求，all为所有针对这个路径的请求
*/


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
