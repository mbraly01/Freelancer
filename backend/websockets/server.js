const express = require('express')
const socket = require('socket.io');
const http = require('http');
const router = require('./router');
const mongoose = require('mongoose');
let Player = require('../models/player.model');
let Character = require('../models/character.model');
let Crew = require('../models/crew.model');
const { updateOne } = require('../models/player.model');
const { findOneAndUpdate} = require('../models/crew.model');
// const { default: Character } = require('../../src/components/Character');



require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,
useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open',() => {
    console.log('MongoDB database connection established successfully')
});

const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('login', ({ username }, callback) => {
        console.log(username);

        Player.find({"username": username}, function (err, player) {
            if(err) {
                console.log("there has been an error"), {player: null}
            }
            if (player[0] != undefined) {
            socket.emit('lid', { password: player[0]['password'].toString(), id : player[0]['_id']})
            }
        })   
    })
    socket.on('signup', ({ username, hash, characters, gm }, callback) => {
        const password = hash

        Player.find({'username': username}, function (err, player) {
            if (player[0] != undefined) {
                socket.emit('duplicate', {duplicate: true})
            }
            else {
                socket.emit('duplicate', {duplicate: false})
                const newPlayer = new Player({username, password});
                newPlayer.save()
                socket.emit('sid', { id : newPlayer['_id']})
            }
        })
    })

    socket.on('playertoserver', ({ id}, callback) => {
        Player.find({'id': id}, function (err, player) {
            socket.emit('playertoclient', {player: player})
        })
    })
    socket.on('createcrew', ({playerId, gm 
        // players, type
        // , crewname, reputation, lairname, rep, turf, hold, tier, claims, heat, wantedlevel, coin, xp, specials1, specials2, specials3, specials4, specials5, specials6, specials7, contacts1, contacts2, contacts3, contacts4, contacts5, contacts6, upgrades1, upgrades2, upgrades3, upgrades4, upgrades5, lair1, lair2, lair3, lair4, lair5, lair6, lair7, quality1, quality2, quality3, quality4, quality5, quality6, traininginsight, trainingprowess, trainingresolve, trainingpersonal, mastery, clocks, notes
    }) => {
        const newCrew = new Crew({gm})
        newCrew.save()
        if (gm == true) {
        Player.findOneAndUpdate({'_id': playerId}, {$push: {'gms': newCrew['_id']}})
        };
        socket.emit('newcrewid', {crew: newCrew['_id']})
        console.log('claled')
    })

    socket.on('getcrews', ({id}) => {
        Player.findOne({'_id': id})
        .then(player => {
            let namesAndCharIds = []
            chars = player.characters;
            for (i in chars) {
                Character.findOne({'_id':i})
                .then(character => {
                    namesAndCharIds.push([i, character.firstname, character.alias, character.lastname])
                })
            }
            console.log(namesAndCharIds);
            socket.emit('returnchars', {chars: namesAndCharIds})
        })


    })  
    socket.on('createchar', ( { crewId, firstname, alias, lastname
        // crew, type, firstname, lastname, alias, insightxp
        // , alias, look, heritage, background, insightxp, hunt, study, survey, tinker, prowessxp, finesse, prowl, skirmish, wreck, resolvexp, attune, command, consort, sway, vice, stress, trauma, harm3, harm2, harm1, healing, armornormal, armorheavy, armorspecial, specialsxp, specials1, specials2, specials3, specials4, specials5, specials6, specials7, specials8, specials9, friends1, friends2, friends3, friends4, friends5, items1, items2, items3, items4, items5, items6, load, gear1, gear2, gear3, gear4, gear5, gear6, gear7, gear8, gear9, gear10, gear11, gear12, gear13, gear14, gear15, gear16, coin, stash, notes
    }) => {
        const newChar = new Character({crewId, firstname, alias, lastname
            //  crew, type, firstname, lastname, alias, insightxp
        })
        newChar.save()
        socket.emit('newcharid', {char: newChar['_id']})
    })

    socket.on('charidtoserver', ({ id }) => {
        Character.findOne({'_id': id}, function (err, char) {
            socket.emit('chartoclient', {char: char})
        })
    })

    socket.on('editchar', ({ id, trait, val }, callback) => {
        Character.findOneAndUpdate({'_id': id}, { [trait] : val })
    })


    socket.on('addchartoplayer', ({id, charids}, callback) => {
        console.log(id)
        console.log(charids)
        Player.findOneAndUpdate({'_id': id}, {'characters': charids})
        console.log(Player.findOne({'_id': id}).characters)
    })

    socket.on('addcrewsandchars', ({charId, crewId}, callback) => {
        Character.findOneAndUpdate({'_id': charId}, {'crewId': crewId});
        Crew.findOneAndUpdate({'_id': '5ef5064e004b112db6c0ffc9'}, {gm: '5ef50698004b112db6c0ffca'});        
        let arrayChars = ["kmsadkm"];
        Crew.findOneAndUpdate({'_id': '5ef5064e004b112db6c0ffc9'}, {gm: crewId});
        console.log(crewId)
        Crew.findById(crewId)
        .then(crew => {
            console.log(crew)
            // arrayChars = crew.characters
            arrayChars.push(crewId)
            console.log(arrayChars)
            Crew.updateOne({ '_id': crewId}, {characters: arrayChars});
            socket.emit('test1', {response: arrayChars});
        })
        Crew.findOneAndUpdate({'_id': crewId}, {'characters': arrayChars})
        console.log(Crew.findOne({'_id': crewId}))
        console.log(Crew.findOne(crewId))
    })

    socket.on('test2', ({test2pass}, callback) => {
        console.log(test2pass)
        Crew.findOneAndUpdate({'_id': test2pass[1]}, {'gm': test2pass[0]})
    })
})

app.use(router);

server.listen(PORT, () => console.log('Server is working'))