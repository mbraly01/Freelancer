const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const crewSchema = new Schema({
    gm: {
        type: String
    },
    characters: {
        type: Array
    }
});

const Crew = mongoose.model('Crew', crewSchema);

module.exports = Crew;









// const mongoose = require('mongoose')

// const Schema = mongoose.Schema;

// const crewSchema = new Schema({
//     characters: {
//         type: Array
//     },
//     gm: {
//         type: String
//     },
//     players: {
//         type: Array
//     },
//     type: {
//         type: String
//     },
//     name: {
//         type: String
//     },
//     reputation: {
//         type: String
//     },
//     lairname: {
//         type: String
//     },
//     rep: {
//         type: Number
//     },
//     turf: {
//         type: Number
//     },
//     hold: {
//         type: String
//     },
//     tier: {
//         type: Number
//     },
//     claims: {
//         type: Array
//     },
//     heat: {
//         type: Number
//     },
//     wantedlevel: {
//         type: Number
//     },
//     coin: {
//         type: Number
//     },
//     xp: {
//         type: Number
//     },
//     specials1: {
//         type: Array
//     },
//     specials2: {
//         type: Array
//     },
//     specials3: {
//         type: Array
//     },
//     specials4: {
//         type: Array
//     },
//     specials5: {
//         type: Array
//     },
//     specials6: {
//         type: Array
//     },
//     specials7: {
//         type: Array
//     },
//     contacts1: {
//         type: Array
//     },
//     contacts2: {
//         type: Array
//     },
//     contacts3: {
//         type: Array
//     },
//     contacts4: {
//         type: Array
//     },
//     contacts5: {
//         type: Array
//     },
//     contacts6: {
//         type: Array
//     },
//     upgrades1: {
//         type: Array
//     },
//     upgrades2: {
//         type: Array
//     },
//     upgrades3: {
//         type: Array
//     },
//     upgrades4: {
//         type: Array
//     },
//     upgrades5: {
//         type: Array
//     },
//     lair1: {
//         type: Array
//     },
//     lair2: {
//         type: Array
//     },
//     lair3: {
//         type: Array
//     },
//     lair4: {
//         type: Array
//     },
//     lair5: {
//         type: Array
//     },
//     lair6: {
//         type: Array
//     },
//     lair7: {
//         type: Array
//     },
//     quality1: {
//         type: Array
//     },
//     quality2: {
//         type: Array
//     },
//     quality3: {
//         type: Array
//     },
//     quality4: {
//         type: Array
//     },
//     quality5: {
//         type: Array
//     },
//     quality6: {
//         type: Array
//     },
//     traininginsight: {
//         type: Number
//     },
//     trainingprowess: {
//         type: Number
//     },
//     trainingresolve: {
//         type: Number
//     },
//     trainingpersonal: {
//         type: Number
//     },
//     mastery: {
//         type: Number
//     },
//     clocks: {
//         type: Array
//     },
//     notes: {
//         type: Array
//     }

// });

// const Crew = mongoose.model('Crew', crewSchema);

// module.exports = Crew;