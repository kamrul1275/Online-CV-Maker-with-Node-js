
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const experienceMiddleware = require('../middleware/experienceMiddleware');

const experienceController = require('../controllers/experienceController');
const multer = require('multer');
const upload = multer(); // Initialize multer


// Define routes
router.get('/experience', experienceController.getAllExperiences);
router.get('/experience/:id', experienceController.getExperienceById);
router.post('/experience', experienceController.createExperience);
router.put('/experience/:id', experienceController.updateExperience);
router.delete('/experience/:id', experienceController.deleteExperience);

module.exports = router;