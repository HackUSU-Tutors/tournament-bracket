const mongoose = require('mongoose');

const MatchSchema = mongoose.Schema({
    winner: {
        type: String,
        default: ""
    },
    players: [
        {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = Match = mongoose.model('match', MatchSchema);