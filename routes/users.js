// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

module.exports = router;

