var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const db = require('./models'); // index.js가 있는 models 폴더

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 🔑 세션과 passport 설정은 라우터보다 먼저!
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);  // passport 설정 적용

// 기본 미들웨어
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 🔽 라우터는 passport 설정 이후에 등록해야 함!
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 에러 처리
app.use(function(req, res, next) {
  next(createError(404));
});

// DB 연결
db.sequelize.sync()
  .then(() => {
    console.log('✅ 데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('❌ 데이터베이스 연결 실패:', err);
  });

// 에러 핸들러
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// 서버 실행
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://34.64.197.111:3000');
});

module.exports = app;
