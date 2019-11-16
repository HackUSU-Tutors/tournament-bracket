const express = require('express');
var router = express.Router();

// const Match = require('./models/Match');
const Tournament = require('../models/Tournament')


// @route /tournaments/:tour_id
router.get('/:tour_id', async (req, res) => {
    try{
        const bracket = await Tournament.findOne({ id: req.params.tour_id });
        if(!bracket){
            return res.status(404).json({ msg: 'Tournament not found!'});
        }
        res.json(bracket);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;