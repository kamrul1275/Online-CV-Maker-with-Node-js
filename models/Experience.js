const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Ensure User model is imported

const Experience = sequelize.define('Experience', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'experiences',
    timestamps: false
});

// Define associations
Experience.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Experience, { foreignKey: 'userId' });

// Sync the model with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Experience table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error.message);
//     });

module.exports = Experience;