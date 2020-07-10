import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';

let socket

export default function Home(props) {

    const [crewList, setCrewList] = useState();
    const [charList, setCharList] = useState();
    const [red, setRed] = useState(false);
    const ENDPOINT = 'localhost:5000';
    const [id, setId] = useState();
    
    function getCrews() {
        socket.emit('getcrews', { id: props.cookies.id});

        socket.on('returncrews', (response) => {
            setCrewList(response.crews.map((crew) => {
                return (
                    <button>{crew.crew.name}</button>
                )
            }))
            console.log(response)
        })
    }

    function getChars() {
        socket.emit('getchars', { id: props.cookies.id});

        socket.on('returnchars', (response) => {
            setCharList(response.chars.map((char) => {
                return(
                <Link to={{
                    pathname:'/charid',
                    state: { charid: char.id}}}>{char.name}</Link>
                )
            }))
        })
    }

    async function logout() {
        await setRed(true)
        await props.removeCookie('id')

    }


    useEffect(() => {
        socket = io(ENDPOINT);
        getChars()
        return () => {
            socket.emit('disconnect');
        }
    },[ENDPOINT])

    return(
        <div>
            {/* <Link>Create a Game</Link>
            <Link>Join a Game</Link> */}
            <div></div>
            {/* <Link to={`/char?id=${id}`}>Hello</Link> */}
            
            <button onClick={e => logout() }>Logout</button>
            { red && <Redirect to="/"/>}
            {charList}
            <p>{props.cookies.id}</p>
        </div>
    )
}