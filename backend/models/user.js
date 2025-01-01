// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // Import the Sequelize instance

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user', // Specify the table name if different
    timestamps: false // Set to true if you have created_at/updated_at fields
});

module.exports = User;
