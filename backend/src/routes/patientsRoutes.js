const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');

router.post('/create', patientsController.create);
router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getById);
router.delete('/:id', patientsController.delete);

module.exports = router;
