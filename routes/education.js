const express = require('express');
const educationController = require('../controllers/educationController');

const router = express.Router();

// Define routes
router.get('/', educationController.getAllEducation);
router.get('/:id', educationController.getEducationById);
router.post('/create', educationController.createEducation);
router.put('/:id', educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);

module.exports = router;