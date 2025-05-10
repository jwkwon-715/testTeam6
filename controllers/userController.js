// controllers/authController.js
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Users } = require('../models');

// 회원가입 처리
exports.signup = async (req, res) => {
  const { user_id, password, phone, email, birthdate } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10); // 10은 saltRounds

    // 사용자 생성
    await Users.create({
      user_id,
      password: hashedPassword,
      phone,
      email,
      birthdate,
    });

    res.send('회원가입 성공');
  } catch (error) {
    console.error(error);
    res.send('회원가입 중 오류가 발생했습니다.');
  }
};

// 로그인 처리
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send(info.message); // 로그인 실패 메시지

    req.logIn(user, (err) => {
      if (err) return next(err);
      
      // 로그인 성공 후 프로필 페이지로 리디렉션
      return res.redirect('/users/profile');  // 로그인 후 프로필 페이지로 리디렉션
    });
  })(req, res, next);
};
