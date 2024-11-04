const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer(); // Initialize multer

const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', upload.none(), authController.register);
router.post('/login', upload.none(), authController.login);

router.get('/users', authController.getUsers);
router.get('/users/dashboard', authMiddleware, authController.dashboard);
router.get('/users/:id', authController.getUserById);
router.put('/users/:id', upload.none(), authController.updateUser); // Use multer for form-data
router.delete('/users/:id', authController.deleteUser);
router.post('/logout', authController.logout);

module.exports = router;