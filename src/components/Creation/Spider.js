import React from 'react';
import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client'


let socket;
export default function Spider(props) {


    const [char, setChar] = useState({});
    const [insightxp, setInsightxp] = useState();
    const ENDPOINT = 'localhost:5000';
    
    async function getChar() {
        socket.emit('charidtoserver', {id: '5eefc16c7b869a1291391c88'});

        await socket.on('chartoclient', (response) => {
            setChar(response['char']);
        })
    }

    function raise() {
        // setChar("1")
    }



    useEffect(() => {
        socket = io(ENDPOINT);
        getChar();
        
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT])
    return (
        <div>
            <h1>{char.firstname} "{char.alias}" {char.lastname}</h1>
            <h2>{char.crew}</h2>
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
            <button className="lower" onClick={e => setChar({...char, "stress": char.stress - 1})}>Lower</button>
        </div>
    )
}
