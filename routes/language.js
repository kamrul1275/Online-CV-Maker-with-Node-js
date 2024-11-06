const express = require('express');
const languageController = require('../controllers/languageController');

const router = express.Router();

const multer = require('multer');
const upload = multer(); // Initialize multer
const app = express();
const bodyParser = require('body-parser');


// Define routes
router.get('/', languageController.getAllLanguages);
router.get('/:id', languageController.getLanguageById);
router.post('/create', languageController.createlanguage);
router.put('/:id', languageController.updateLanguage);
router.delete('/:id', languageController.deleteLanguage);

module.exports = router;



