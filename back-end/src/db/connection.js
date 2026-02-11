const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "senha123",
  database: "teste_climba",
  port: 3306,
});

module.exports = pool;
