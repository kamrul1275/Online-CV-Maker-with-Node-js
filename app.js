const express = require('express');
const { Pool } = require('pg');
const authRoute = require('./routes/auth');
const skillRoute = require('./routes/skill');
const experienceRoute = require('./routes/experience');
const educationRoute = require('./routes/education');
const languageRoute = require('./routes/language');
const cvgenerateRoute = require('./routes/cvgenerate');

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 8000;

const sequelize = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.none()); // To handle form-data


// User Authentication
app.use('/api', authRoute);

// Experience routes
app.use('/api', experienceRoute);

//Skill
app.use('/api/skill', skillRoute);

//language 
app.use('/api/language', languageRoute);

//education
app.use('/api/education', educationRoute);

// cvgenerate
app.use('/api', cvgenerateRoute);

// Start server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle EADDRINUSE error
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        throw error;
    }
});