const pool = require("../db/connection");

async function postRegister(body) {
  const { nome, email, dataNascimento, profissao, observacoes } = body;

  const [result] = await pool.execute(
    `INSERT INTO users (nome, email, data_nascimento, profissao, observacoes)
       VALUES (?, ?, ?, ?, ?)`,
    [nome, email, dataNascimento, profissao, observacoes],
  );

  const userId = result.insertId;

  const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [
    userId,
  ]);

  return rows[0];
}

module.exports = { postRegister };
