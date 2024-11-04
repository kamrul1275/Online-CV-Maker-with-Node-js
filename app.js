const express = require('express');
const { Pool } = require('pg');
const authRoute = require('./routes/auth');
const experienceRoute = require('./routes/experience');
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
app.use('/api/', experienceRoute);


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