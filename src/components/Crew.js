import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client'

let socket
export default function Crew(props) {

    const gm = ""
    const players = []
    const [crewId, setCrewId] = useState('');
    const type = ""
    const crewname = ""
    const reputation = ""
    const textAreaRef = useRef(null);
   const ENDPOINT = 'localhost:5000';

    function createCrew() {
        console.log('is called')
        socket.emit('createcrew', {playerId: props.cookies.id, gm: gm})
        socket.on('newcrewid', (response) => {
            setCrewId(response.crew)
            console.log(response.crew)
        })
    }

    function copyCode() {
        textAreaRef.current.select();
        document.execCommand('copy');
    }

   useEffect(() => {
        socket = io(ENDPOINT)

        return(
            socket.on('disconnect')
        )
   },[ENDPOINT])

   return(
       <div>
            <button onClick={createCrew}>Hi</button>
            <button onClick={copyCode}>Copy</button>
            <form>
                <textarea 
                // style={{visibility: "hidden"}}
                        ref={textAreaRef}
                        value={crewId}
                    />
            </form>
       </div>
   )
}