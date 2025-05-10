// controllers/authController.js
const bcrypt = require('bcrypt');
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
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.send('로그인 성공');
      } else {
        res.send('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } else {
      res.send('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  } catch (error) {
    console.error(error);
    res.send('로그인 중 오류가 발생했습니다.');
  }
};
