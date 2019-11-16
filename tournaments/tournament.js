const express = require('express');
var router = express.Router();

const Match = require('./models/Match');
const Tournament = require('./models/Tournament')


// @route /brackets/:bracketID
router.get('/:tour_id', async (req, res) => {
    try{
        const bracket = await Tournament.findOne({ id: req.params.tour_id });

    }
});

module.exports = router;