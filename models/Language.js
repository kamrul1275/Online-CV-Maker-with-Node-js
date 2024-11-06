const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Language = sequelize.define('Language', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proficiency: {
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
    tableName: 'languages',
    timestamps: false
});

Language.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync()
    .then(() => {
        console.log('Language table has been created.');
    })
    .catch(error => {
        console.error('Unable to create Language table:', error.message);
    });

module.exports = Language;