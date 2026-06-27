const Consultation = require('../models/consultation');

const consultationsController = {
  async create(req, res) {
    try {
      const { patient_id, date, reason, diagnosis, prescription, notes } = req.body;

      if (!patient_id || !date || !reason || !diagnosis) {
        return res.status(400).json({ success: false, message: 'Paciente, fecha, motivo y diagnostico son requeridos' });
      }

      const newConsultation = await Consultation.create({ patient_id, date, reason, diagnosis, prescription, notes });

      return res.status(201).json({
        success: true,
        message: 'Consulta registrada correctamente',
        data: newConsultation,
      });
    } catch (error) {
      console.log('Error al crear consulta:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Consultation.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Consulta no encontrada' });
      }
      return res.status(200).json({ success: true, message: 'Consulta eliminada correctamente' });
    } catch (error) {
      console.log('Error al eliminar consulta:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },
};

module.exports = consultationsController;
