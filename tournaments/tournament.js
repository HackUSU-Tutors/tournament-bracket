const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

// const Match = require('./models/Match');
const Tournament = require('../models/Tournament')
const User = require('../models/User')


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

// @route /tournaments/create
router.post('/create', auth, async (req, res) => {
    try {
        const {
            name,
            matches
        } = req.body;
        console.log(name);

        const user = await User.findOne({ _id: req.user.id});
        if(!user){
            return res.status(400).json({ error: "No person found with token"});
        }

        var tournament = new Tournament({
            name,
            matches
        });
        // console.log("huihio");
        tournament.save();
        // console.log("huhuhuhuhuhuuhuh");
        // console.log(user);
        user.tournaments.push(tournament._id);
        user.save();        
        return res.status(200).send("Success!");
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("internal server error");
    }
});

module.exports = router;