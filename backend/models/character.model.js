const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    crewId: {
        type: String
    },
    crew: {
        type: String
    },
    type: {
        tyP: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    alias: {
        type: String
    },
    look: {
        type: String
    },
    heritage: {
        type: String
    },
    background: {
        type: String
    },
    insightxp: {
        type: Number
    },
    hunt: {
        type: Number
    },
    study: {
        type: Number
    },
    survey: {
        type: Number
    },
    tinker: {
        type: Number
    },
    prowessxp: {
        type: Number
    },
    finesse: {
        type: Number
    },
    prowl: {
        type: Number
    },
    skirmish: {
        type: Number
    },
    wreck: {
        type: Number
    },
    resolvexp: {
        type: Number
    },
    attune: {
        type: Number
    },
    command: {
        type: Number
    },
    consort: {
        type: Number
    },
    sway: {
        type: Number
    },
    vice: {
        type: String
    },
    stress: {
        type: Number
    },
    trauma: {
        type: Array
    },
    harm3: {
        type: Array
    },
    harm2: {
        type: Array
    },
    harm1: {
        type: Array
    },
    healing: {
        type: Number
    },
    armornormal: {
        type: Number
    },
    armorheavy: {
        type: Number
    },
    armorspecial: {
        type: Number
    },
    specialsxp: {
        type: Number
    },
    specials1: {
        type: Array
    },
    specials2: {
        type: Array
    },
    specials3: {
        type: Array
    },
    specials4: {
        type: Array
    },
    specials5: {
        type: Array
    },
    specials6: {
        type: Array
    },
    specials7: {
        type: Array
    },
    specials8: {
        type: Array
    },
    specials9: {
        type: Array
    },
    specials10: {
        type: Array
    },
    specials11: {
        type: Array
    },
    contacts1: {
        type: Array
    },
    contacts2: {
        type: Array
    },
    contacts3: {
        type: Array
    },
    contacts4: {
        type: Array
    },
    contacts5: {
        type: Array
    },
    items1: {
        type: Array
    },
    items2: {
        type: Array
    },
    items3: {
        type: Array
    },
    items4: {
        type: Array
    },
    items5: {
        type: Array
    },
    items6: {
        type: Array
    },
    load: {
        type: Number
    },
    gear1: {
        type: Array
    },
    gear2: {
        type: Array
    },
    gear3: {
        type: Array
    },
    gear4: {
        type: Array
    },
    gear5: {
        type: Array
    },
    gear6: {
        type: Array
    },
    gear7: {
        type: Array
    },
    gear8: {
        type: Array
    },
    gear9: {
        type: Array
    },
    gear10: {
        type: Array
    },
    gear11: {
        type: Array
    },
    gear12: {
        type: Array
    },
    gear13: {
        type: Array
    },
    gear14: {
        type: Array
    },
    gear15: {
        type: Array
    },
    gear16: {
        type: Array
    },
    coin: {
        type: Number
    },
    stash: {
        type: Number
    },
    notes: {
        type: Array
    }
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;