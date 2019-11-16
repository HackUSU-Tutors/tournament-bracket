const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../private-config/config');
const auth = require("../middleware/auth");

const User = require("../models/User");

router.get('/test', auth, (req, res) =>{
    res.status(200).send("Yay it worked");
});

router.post('/',
    [
        check("email", "Please include an email").isEmail(),
        check("password", "Please enter a valid password").exists()
    ]
    ,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({ msg: "Invalid Credentials" });
            }
            var ismatch = await bcrypt.compare(password, user.password);
            if(!ismatch){
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };
            console.log("haiwhefiuo")
            jwt.sign(
                payload,
                config['jwtsecret'],
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;

                    return res.status(200).json({ token });
                }
            );
        } catch (error) {
            
        }

    }
);


module.exports = router;