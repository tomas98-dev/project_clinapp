const pool = require('../config/database');

const User = {
  async create(user) {
    const { name, lastname, phone, email, password } = user;
    const [result] = await pool.execute(
      'INSERT INTO users (name, lastname, phone, email, password) VALUES (?, ?, ?, ?, ?)',
      [name, lastname, phone, email, password]
    );
    return { id: result.insertId, name, lastname, phone, email, role: 'user' };
  },

  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
  },
};

module.exports = User;
