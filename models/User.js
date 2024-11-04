const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_type: {
        type: DataTypes.ENUM('admin', 'user', 'guest'),
        allowNull: false,
        defaultValue: 'user'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // New field to store the user's token

}, {
    timestamps: true,  // Enable timestamps
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('User table has been created.');
    })
    .catch(error => {
        console.error('Unable to create table : ', error);
    });

module.exports = User;