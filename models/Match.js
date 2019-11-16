const mongoose = require('mongoose');

const MatchSchema = mongoose.Schema({
    winner: {
        type: String,
        default: ""
    },
    people: [
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