import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import queryString from 'query-string';


let socket;
export default function Character(props) {


    const [charId, setCharId] = useState('5ef50698004b112db6c0ffca');
    const [crewId, setCrewId] = useState('5f0c1a0da7b8bd2096cc05c7')
    const [char, setChar] = useState();
    const [playerChars, setPlayerChars] = useState();
    const gear1 = ["empty", 1, 4];
    const crew = "crew";
    const type = "type";
    let firstname = "name";
    let lastname = "lastname";
    let alias = "alias";
    let insightxp = 0;
    const ENDPOINT = 'localhost:5000';


    /// chac no bi loi o
    async function createChar() {
        socket.emit('createchar', {crewId, firstname, alias, lastname
            // , type, firstname, alias, lastname, insightxp, gear1
        });
    
        await socket.on('newcharid', (response) => {
            setCharId([response['char']]);
            console.log(response['char'])});

        socket.emit('playertoserver', {id: props.cookies.id})

        socket.on('playertoclient', (response) => {
            setPlayerChars({...response.characters, charId: charId})
            console.log('works')
        })

        socket.emit('addchartoplayer', {id: props.cookies.id, charids: playerChars}); 
        // socket.emit('editchar', {id: id, trait: crew, val: "crew2"})
        }
    
    function addCrew() {
        socket.on('test1', (response) => {
            console.log(response)
            console.log(response.response[0])
            socket.emit('test2', ({test2pass: response.response}))
        });
        socket.emit('addcrewsandchars', {charId: charId, crewId: crewId});
        
    }
    

    async function mapChar() {
        socket.emit('charidtoserver', {charId})

        await socket.on('chartoclient', (response) => {
            setChar(response['char'])
            console.log(response['char']);
        })
    }

    async function addChar() {
        socket.emit('')
    }

    

    useEffect(() => {
        socket = io(ENDPOINT);
        // setCharId(this.props.location.state)
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT])

    return(
        <div>
            <button onClick={createChar}>createChar</button>
            <button onClick={mapChar}>mapchar</button>
            <form>
                <input 
                type="text"
                onChange={e => setCrewId(e.target.value)}/>
            </form>
            <button onClick={addCrew}>Add Crew</button>

            <h1>Join</h1>
            <button type="submit">Sign in</button>
            <div>
                {/* <h1>{char.firstname} "{char.alias}" {char.lastname}</h1> */}
                {/* <h2>{char.crew}</h2>
                <h2>The {char.type}</h2>
                <h3>{char.look}</h3>
                <h3>{char.heritage}</h3>
                <h3>{char.background}</h3>

                <h5>Insight</h5>
                <p>xp: {char.insightxp}/6</p>
                <button className="raise" onClick={e => setChar({...char, "insightxp": char.insightxp + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "insightxp": char.insightxp - 1})}>Lower</button>
                <p>hunt: {char.hunt}</p>
                <button className="raise" onClick={e => setChar({...char, "hunt": char.hunt + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "hunt": char.hunt - 1})}>Lower</button>
                <p>study: {char.study}</p>
                <button className="raise" onClick={e => setChar({...char, "study": char.study + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "study": char.study - 1})}>Lower</button>
                <p>survey: {char.survey}</p>
                <button className="raise" onClick={e => setChar({...char, "survey": char.survey + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "survey": char.survey - 1})}>Lower</button>
                <p>tinker: {char.tinker}</p>
                <button className="raise" onClick={e => setChar({...char, "tinker": char.tinker + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "tinker": char.tinker - 1})}>Lower</button>

                <h5>Prowess</h5>
                <p>xp: {char.prowessxp}/6</p>
                <button className="raise" onClick={e => setChar({...char, "prowessxp": char.prowessxp + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "prowessxp": char.prowessxp - 1})}>Lower</button>
                <p>finesse: {char.finesse}</p>
                <button className="raise" onClick={e => setChar({...char, "finesse": char.finesse + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "finesse": char.finesse - 1})}>Lower</button>
                <p>prowl: {char.prowl}</p>
                <button className="raise" onClick={e => setChar({...char, "prowl": char.prowl + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "prowl": char.prowl - 1})}>Lower</button>
                <p>skirmish: {char.skirmish}</p>
                <button className="raise" onClick={e => setChar({...char, "skirmish": char.skirmish + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "skirmish": char.skirmish - 1})}>Lower</button>
                <p>wreck: {char.wreck}</p>
                <button className="raise" onClick={e => setChar({...char, "wreck": char.wreck + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "wreck": char.wreck - 1})}>Lower</button>

                <h5>Resolve</h5>
                <p>xp: {char.resolvexp}/6</p>
                <button className="raise" onClick={e => setChar({...char, "resolvexp": char.resolvexp + 1})}>Raise</button>
                <button classNaem="lower" onClick={e => setChar({...char, "resolvexp": char.resolvexp - 1})}>Lower</button>
                <p>attune: {char.attune}</p>
                <button className="raise" onClick={e => setChar({...char, "attune": char.attune + 1})}>Raise</button>
                <button className = "lower" onClick={ e=> setChar({...char, "attune": char.attune - 1})}>Lower</button>
                <p>command: {char.command}</p>
                <button className="raise" onClick={e => setChar({...char, "command": char.command + 1})}>Raise</button>
                <button classNaem ="lower" onClick={e => setChar({...char, "command": char.command - 1})}>Lower</button>
                <p>consort: {char.consort}</p>
                <button className="raise" onClick={e => setChar({...char, "consort": char.consort + 1})}>Raise</button>
                <button className="lower" onClick={e => setChar({...char, "consort": char.consort - 1})}>Lower</button>
                <p>sway: {char.sway}</p>
                <button className="raise" onClick={e => setChar({...char, "sway": char.sway + 1})}>Raise</button>
                <button classNaem="lower" onClick={e => setChar({...char, "sway": char.sway - 1})}>Lower</button>


                <h3>Vice: {char.vice}</h3>
                <p>stress: {char.stress}</p>
                <button className="raise" onClick={e => setChar({...char, "stress": char.stress + 1})}>Raise</button>
    <button className="lower" onClick={e => setChar({...char, "stress": char.stress - 1})}>Lower</button>*/}
            </div>
        </div>
    )
}






// import React from 'react';
// import { useState, useEffect } from 'react';


// export default function Character() {

//     let props = {"char": 0}
//     const [stress, setStress] = useState()
//     props.char = {
//                 "crew": "",
//                 "name": "",
//                 "alias": "",
//                 "type": "Spider",
//                 "look": "",
//                 "heritage": "",
//                 "background": "",
//                 "stats": {
//                     "Insight": {
//                         "xp":0,
//                         "hunt":0,
//                         "study":1,
//                         "survey":0,
//                         "tinker":0
//                     },
//                     "Prowess": {
//                         "xp":0,
//                         "Finesse":0,
//                         "Prowl":0,
//                         "Skirmish":0,
//                         "Wreck":0
//                     },
//                     "Resolve": {
//                         "xp":0,
//                         "Attune":0,
//                         "Command":0,
//                         "Consort":2,
//                         "Sway":0
//                     }
//                 },
//                 "vice": "Obligation",
//                 "stress": 0,
//                 "trauma": "cold, haunted",
//                 "harm" : {
//                     "three": "",
//                     "two": "",
//                     "one": ""
//                 },
//                 "healing": 0,
//                 "armor": {
//                     "normal": "\u25AD",
//                     "heavy": "\u25AD",
//                     "special": "\u25AD"
//                 },
//                 "specials": {
//                     "xp" : 0,
//                     "one" : ["\u25EF","Foresight: Two times per score you can assist a teammate without paying stress."],
//                     "two": ["\u25EF","Calculating: During dowtime, you may give yourself or a crewmate an additional downtime action"],
//                     "three": ["\u25EF","Connected: During downtime, you get +1 result level when you acquire an asset of reduce heat"],
//                     "three": ["\u25EF","Functioning Vice: When you indulge in your vice, you may adjust the outcome die by one or two. An ally who joins in your vice may do the same."],
//                     "four": ["\u25EF","Ghost Contract: When you shake on a deal, you and your partner-human or otherwise-both bear a mark of your oath. If either breaks the contract, they take level three harm, 'Cursed'."],
//                     "five": ["\u25EF","Jail Bird: When incarcerated, your wanted level counts as one less, your Tier as one more, and you gain +1 faction status with a faction you help on the inside (in addition to your incarceration roll)"],
//                     "six": ["\u25EF","Mastermind: You may expend yoru special armor to protect a crewmate, or to push yourself when you gather information or work on a long-term project."],
//                     "seven": ["\u25EF","Weaving the Web: You gain +1d to Consort when you gather information on a target for a score. You get +1d to the engagement roll for that operation."],
//                     "eight":["\u25EF","\u25EF","\u25EF","Veteran: Choose a special ability from another source"]
//                 },
//                 "friends": {
//                     "one": ["\u25b3", "\u25BD", "Salia, an information broker"],
//                     "two": ["\u25b3", "\u25BD", "Augus, a master architect"],
//                     "three": ["\u25b3", "\u25BD", "Jennah, a servant"],
//                     "four": ["\u25b3", "\u25BD", "Riven, a chemist"],
//                     "five": ["\u25b3", "\u25BD", "Jeren, a bluecoat archivist"],
//                 },
//                 "items": {
//                     "one": ["\u25A1", "Fine cover identity(0)"],
//                     "one": ["\u25A1", "Fine bottle of whiskey(1)"],
//                     "one": ["\u25A1", "Blueprints(1)"],
//                     "one": ["\u25A1", "Vial of slumber essence(0)"],
//                     "one": ["\u25A1", "Concealed palm pistol(0)"],
//                     "one": ["\u25A1", "Spiritbane charm(0)"],
//                 },
//                 "load": ['\u2616', '\u2616', '\u2616'],
//                 "gear": {
//                     "one": ["\u25A1", "A Blade or Two"],
//                     "two": ["\u25A1", "Throwing Knives"],
//                     "three": ["\u25A1", "A Pistol"],
//                     "four": ["\u25A1", "A Second Pistol"],
//                     "five": ["\u25A1", "\u25A1", "A Large Weapon"],
//                     "six": ["\u25A1", "An Unusual Weapon"],
//                     "seven": ["\u25A1","\u25A1", "Armor"],
//                     "eight": ["\u25A1","\u25A1", "\u25A1", "Heavy Armor"],
//                     "nine": ["\u25A1","Burglary Gear"],
//                     "ten": ["\u25A1", "\u25A1", "Climbing Gear"],
//                     "eleven": ["\u25A1", "Arcane Implements"],
//                     "twelve": ["\u25A1", "Documents"],
//                     "thirteen": ["\u25A1", "Subterfuge Supplies"],
//                     "fourteen": ["\u25A1", "\u25A1", "Demolition Tools"],
//                     "fifteen": ["\u25A1", "Tinkering Tools"],
//                     "sixteen": ["\u25A1", "Lantern"]
//                 },
//                 "coin":0,
//                 "stash":0
//                 }
//     return (
//         <div>
//             <h1>Name: {props.char.name}</h1>
//             <h2>Alias: {props.char.alias}</h2>
//             <h1>Crew: {props.char.crew}</h1>
//             <p>{props.char.look}</p>
//             <p>{props.char.heritage}</p>
//             <p>{props.char.background}</p>
//             <h1>Vice: {props.char.vice}</h1>
//             <h1>Stress: {props.char.stress[0]}/{props.char.stress[1]}</h1>
//             <h3>Trauma: {props.char.trauma}</h3>
//             <h1>Harm:</h1>
//             <h2>{props.char.harm.three}</h2>
//             <h2>{props.char.harm.two}</h2>
//             <h2>{props.char.harm.one}</h2>
//             <h1>Healing: {props.char.healing}/4</h1>
//             <h3>Armor Uses:</h3>
//             <h3>Armor: {props.char.armor.normal}</h3>
//             <h3>Heavy: {props.char.armor.heavy}</h3>
//             <h3>Special: {props.char.armor.special}</h3>
//             <h1>Special Abilities:</h1>
//             <h3>{props.char.specials.one[0]} {props.char.specials.one[1]}</h3>
//             <h3>{props.char.specials.two[0]} {props.char.specials.two[1]}</h3>
//             <h3>{props.char.specials.three[0]} {props.char.specials.three[1]}</h3>
//             <h3>{props.char.specials.four[0]} {props.char.specials.four[1]}</h3>
//             <h3>{props.char.specials.five[0]} {props.char.specials.five[1]}</h3>
//             <h3>{props.char.specials.six[0]} {props.char.specials.six[1]}</h3>
//             <h3>{props.char.specials.seven[0]} {props.char.specials.seven[1]}</h3>
//             <h3>{props.char.specials.eight[0]} {props.char.specials.eight[1]} {props.char.specials.eight[2]} {props.char.specials.eight[3]}</h3>
//             <h1>Friends</h1>
//             <h3>{props.char.friends.one}</h3>
//             <h3>{props.char.friends.two}</h3>
//             <h3>{props.char.friends.three}</h3>
//             <h3>{props.char.friends.four}</h3>
//             <h3>{props.char.friends.five}</h3>
//             <h1>Items (and Weights)</h1>
//             <h3>{props.char.items.one}</h3>
//             <h3>{props.char.items.one}</h3>
//             <h3>{props.char.items.two}</h3>
//             <h3>{props.char.items.three}</h3>
//             <h3>{props.char.items.four}</h3>
//             <h1>Load</h1>

//         {'\u25EF'}
//         {'\u26AB'}
//         {'\u25BC'}
//         {'\u25BD'}
//         {'\u25AD'}
//         {'\u25AC'}
//         {'\u2bC5'}
//         {'\u25B3'}
//         {"\u25A0"}
//         {"\u25A1"}
//         {'\u2616'}
//         {'\u2617'}
//         <button>Hi</button>
//         </div>
//     )
// }