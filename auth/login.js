const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

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

    }
)


module.exports = router;