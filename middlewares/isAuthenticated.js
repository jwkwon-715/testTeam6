// middlewares/isAuthenticated.js
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();  // 인증된 사용자만 접근
    }
    res.redirect('/users/login');  // 인증되지 않은 사용자 리디렉션
  };
  