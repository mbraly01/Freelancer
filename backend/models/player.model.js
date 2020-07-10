const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    characters: {
        type: Array
    },
    gms: {
        type: Array
    }

});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;