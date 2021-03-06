const mongoose = require('mongoose');

const TournamentSchema = mongoose.Schema
({
    name: {
        type: String,
        required: true
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});

module.exports = Tournament = mongoose.model('tournament', TournamentSchema);