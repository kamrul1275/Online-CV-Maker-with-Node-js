const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { Op } = require('sequelize');// Adjust the path as necessary
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


let tokenBlacklist = [];



// User registration
// Define the register function
exports.register = async (req, res) => {
    const { name, username, email, password } = req.body;

    // Validate input data
    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if the user already exists
        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};



// Define the login function

exports.login = async (req, res) => {

    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' }, (error, token) => {

            if (error) throw error;

            res.status(200).json({
                message: 'Login Successfully',
                success: true,
                token: token,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};//end of login function

// Define the dashboard function

// Define the getUsers function
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};//end of getUsers function



// // Define the getUserById function
exports.getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};//end of getUserById function

// // Define the updateUser function
// // Define the updateUser function
// exports.updateUser = async (req, res) => {
//     const id = req.params.id;
//     const { name, username, email, password } = req.body;

//     try {
//         const user = await User.findByPk(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }// Validate input data
//         else if (!user.name || !user.username || !user.email || !user.password) {
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }
//         // Update user fields
//         user.name = name || user.name;
//         user.username = username || user.username;
//         user.email = email || user.email;

//         console.log("check name:", user.name);

//         if (password) {
//             // Hash the password
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);
//         }

//         await user.save();
//         res.status(200).json({ message: 'User updated successfully...' });
//     } catch (error) {
//         console.error("error", error.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// };//end of updateUser function

// Define the updateUser function
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, username, email, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate input data
        if (!name && !username && !email && !password) {
            return res.status(400).json({ message: 'Please provide at least one field to update' });
        }

        // Update user fields only if they are not empty
        if (name) user.name = name;
        if (username) user.username = username;
        if (email) user.email = email;

        if (password) {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error("error", error.message);
        res.status(500).json({ message: 'Server error' });
    }
}; // end of updateUser function


exports.dashboard = async (req, res) => {
    res.status(200).json({ message: 'Welcome to the dashboard' });
};//end of dashboard function





// // Define the deleteUser function
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};//end of deleteUser function




exports.logout = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    // Add the token to the blacklist
    tokenBlacklist.push(token);
    res.status(200).json({ message: 'User logged out successfully' });
};//end of logout function