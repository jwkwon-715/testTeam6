// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');  // 미들웨어 가져오기

// 회원가입 페이지 렌더링 (GET)
router.get('/signup', (req, res) => {
  res.render('signup');  // signup.ejs 파일을 렌더링
});

// 회원가입 처리 (POST)
router.post('/signup', userController.signup);

// 로그인 페이지 렌더링 (GET)
router.get('/login', (req, res) => {
  res.render('login');  // login.ejs 파일을 렌더링
});

// 로그인 처리 (POST)
router.post('/login', userController.login);

// 인증된 사용자만 접근할 수 있는 프로필 페이지
router.get('/profile', isAuthenticated, (req, res) => {
  console.log('User:', req.user);  // 로그 추가
  res.render('profile', { user: req.user });  // 사용자 정보 제공
});


module.exports = router;
