const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./private-config/config.json', 'utf8'));

const User = require("../models/User");

router.post('/', 
    [
        check("email", "Please enter a valid email").isEmail(),
        check("name", "Name is required").not().isEmpty(),
        check("password", "Password must have a length of 6").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // console.log("Request " + req)
            // console.log(req.body);
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        
        try {
            let user = await User.findOne({ email });
            if(user){
                return res.status(400).json({ msg: "User already exists"});
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config['jwtsecret'],
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.status(200).json({ token });
                }
            )
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;