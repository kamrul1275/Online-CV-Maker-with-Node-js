const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const User = require('./User'); // Adjust the path as necessary

const Skill = sequelize.define('Skill', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'skills',
    timestamps: false
});

Skill.belongsTo(User, { foreignKey: 'userId' });


// Sync the model with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Skill  table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error.message);
//     });


module.exports = Skill;