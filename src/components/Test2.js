import React from 'react';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

let socket;



export default function Test2(props) {

    const [username, setUsername] = useState("1");
    const [id, setId] = useState('');
    const password = "1";
    const ENDPOINT = 'localhost:5000';
    let id2 = '';
    let password2 = '';
    let test = [];

    function sendMessage(e) {
        e.preventDefault();

        socket.emit('login', { username });
        

        socket.on("id", (response) => {
            password2 = response['password'];
            id2 = response['id']; console.log(id2);
            console.log(password2)
        });
        socket.on("")
    }
    useEffect(() => {
        socket = io(ENDPOINT);


        return () => {
            socket.emit('disconnect');

           socket.off(); 
        }
    }, [ENDPOINT])

    return (
        <div>
            {props.cookies['id']}
            <form>
                <input
                type="text"
                value={username}
                onChange={({ target: {value} }) => setUsername(value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}/>
                <button onClick={e => sendMessage(e)}>Send</button>
            </form>
        </div>
    )
}