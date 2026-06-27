const Patient = require('../models/patient');
const Consultation = require('../models/consultation');

const patientsController = {
  async create(req, res) {
    try {
      const { name, lastname, document_number, age, sex, blood_type, background } = req.body;

      if (!name || !lastname || !document_number || !age || !sex) {
        return res.status(400).json({ success: false, message: 'Los campos nombre, apellido, documento, edad y sexo son requeridos' });
      }

      const existing = await Patient.findByDocument(document_number);
      if (existing) {
        return res.status(409).json({ success: false, message: 'Ya existe un paciente con ese numero de documento' });
      }

      const newPatient = await Patient.create({ name, lastname, document_number, age, sex, blood_type, background });
      return res.status(201).json({ success: true, message: 'Paciente creado correctamente', data: newPatient });
    } catch (error) {
      console.log('Error al crear paciente:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  async getAll(req, res) {
    try {
      const { search } = req.query;
      let patients;
      if (search && search.trim() !== '') {
        patients = await Patient.search(search);
      } else {
        patients = await Patient.getAll();
      }
      return res.status(200).json({ success: true, message: 'Lista de pacientes', data: patients });
    } catch (error) {
      console.log('Error al obtener pacientes:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.getById(id);
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
      }
      const consultations = await Consultation.getByPatientId(id);
      return res.status(200).json({
        success: true,
        message: 'Detalle del paciente',
        data: { patient, consultations },
      });
    } catch (error) {
      console.log('Error al obtener paciente:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Patient.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
      }
      return res.status(200).json({ success: true, message: 'Paciente eliminado correctamente' });
    } catch (error) {
      console.log('Error al eliminar paciente:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },
};

module.exports = patientsController;
