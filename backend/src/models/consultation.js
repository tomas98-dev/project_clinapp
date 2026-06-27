const pool = require('../config/database');

const Consultation = {
  async getByPatientId(patientId) {
    const [rows] = await pool.execute(
      'SELECT * FROM consultations WHERE patient_id = ? ORDER BY date DESC',
      [patientId]
    );
    return rows;
  },

  async create(consultation) {
    const { patient_id, date, reason, diagnosis, prescription, notes } = consultation;
    const [result] = await pool.execute(
      'INSERT INTO consultations (patient_id, date, reason, diagnosis, prescription, notes, synced) VALUES (?, ?, ?, ?, ?, ?, 1)',
      [patient_id, date, reason, diagnosis, prescription || null, notes || null]
    );
    return { id: result.insertId, ...consultation, synced: true };
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM consultations WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Consultation;
