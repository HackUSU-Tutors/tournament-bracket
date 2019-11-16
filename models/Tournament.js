const mongoose = require('mongoose');

const TournamentSchema = mongoose.Schema
({
    name: {
        type: String,
        required: true
    },
    matches: [{
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
    }],
});

module.exports = Tournament = mongoose.model('tournament', TournamentSchema);