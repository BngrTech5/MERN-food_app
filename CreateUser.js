const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User'); // Import the User model
const jwtSecret = "MynameisHelloWorldMernProject58#";

router.post("/createuser", [
    body('email', 'Not a valid email id').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    
    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

router.post("/loginuser", [
    body('email', 'Not a valid email id').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    // Login user logic
});

module.exports = router;
