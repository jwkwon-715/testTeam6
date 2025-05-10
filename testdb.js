require('dotenv').config();  // 환경 변수 로드
const mysql = require('mysql2/promise');

// MySQL DB 연결
let test = async () => {
    const db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        waitForConnections: true,
        insecureAuth: true
    });

    // 데이터 삽입 (INSERT INTO)
    //let insertSql = 'INSERT INTO subscriber (name, email, zipCode) VALUES (?, ?, ?)';
    //let values = ['sswu', 'sswu@sungshin.ac.kr', '12345'];  // 삽입할 데이터

    try {
        // 데이터 삽입
        const [result] = await db.execute(insertSql, values);
        console.log('데이터 삽입 성공:', result);
    } catch (err) {
        console.error('삽입 중 오류 발생:', err);
    }

    // 데이터 조회 (SELECT)
    let selectSql = 'SELECT * FROM users';
    let [rows, fields] = await db.query(selectSql);
    console.log('현재 subscriber 테이블의 데이터:', rows);
};

test();

