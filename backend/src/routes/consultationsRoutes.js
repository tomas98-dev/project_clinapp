const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/consultationsController');

router.post('/create', consultationsController.create);
router.delete('/:id', consultationsController.delete);

module.exports = router;
