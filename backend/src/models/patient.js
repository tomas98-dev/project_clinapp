const pool = require('../config/database');

const Patient = {
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM patients ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  async search(query) {
    const [rows] = await pool.execute(
      'SELECT * FROM patients WHERE document_number LIKE ? OR name LIKE ? OR lastname LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    return rows;
  },

  async create(patient) {
    const { name, lastname, document_number, age, sex, blood_type, background } = patient;
    const [result] = await pool.execute(
      'INSERT INTO patients (name, lastname, document_number, age, sex, blood_type, background) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, lastname, document_number, age, sex, blood_type || null, background || null]
    );
    return { id: result.insertId, name, lastname, document_number, age, sex, blood_type, background };
  },

  async findByDocument(documentNumber) {
    const [rows] = await pool.execute('SELECT * FROM patients WHERE document_number = ?', [documentNumber]);
    return rows.length > 0 ? rows[0] : null;
  },

  async delete(id) {
    await pool.execute('DELETE FROM consultations WHERE patient_id = ?', [id]);
    const [result] = await pool.execute('DELETE FROM patients WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Patient;
