const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: '34.47.123.205',   // GCP VM 외부 IP 주소
  user: 'cc',            // 만든 사용자 이름
  password: 'password',       // 설정한 비밀번호
  database: 'recipe_db'           // 만든 DB 이름
});

conn.connect(err => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 연결 성공!');
});

conn.query('SELECT NOW()', (err, results) => {
  if (err) throw err;
  console.log('현재 시간:', results);
  conn.end();
});
