import React, { useEffect } from 'react';
import io from 'socket.io-client';
import spider from '../Sheets/Characters/Spider.json';

let socket;

export default function CharacterCreation(props) {


    const ENDPOINT = 'localhost:5001';

    useEffect(() => {
    socket = io(ENDPOINT)

    console.log(socket);
    socket.emit('disconnect');
    socket.off();
    }, [ENDPOINT]);

    return (
        <div>{spider[0].gear16}</div>
    )
}