const express = require('express');
const skillController = require('../controllers/skillController');
// const skillMiddleware = require('../middleware/skillMiddleware');

const router = express.Router();

const multer = require('multer');
const upload = multer(); // Initialize multer
const app = express();
const bodyParser = require('body-parser');


// Define routes
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', skillController.createSkill);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;



