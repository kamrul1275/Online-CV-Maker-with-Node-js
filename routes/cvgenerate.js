const express = require('express');
const cvgenerateController = require('../controllers/cvgenerateController');

const router = express.Router();

const multer = require('multer');
const upload = multer(); // Initialize multer
const app = express();
const bodyParser = require('body-parser');



// Define your routes here
router.get('/cv', cvgenerateController.getAllCVs);
router.post('/cv', cvgenerateController.createCV);
router.get('/cv/:id', cvgenerateController.getCVById);
router.put('/cv/:id', cvgenerateController.updateCV);
router.delete('/cv/:id', cvgenerateController.deleteCV);
router.post('/cv/download/:id', cvgenerateController.downloadCV);
module.exports = router;

