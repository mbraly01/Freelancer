import React from 'react';
import bcrypt from 'bcryptjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
// import Player from '../../backend/models/player.model';
import io from 'socket.io-client'


let socket; 
export default function Login(props) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [errorType, setErrorType] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [access, setAccess] = useState(false);
    let response = null;
    let password2 = '';
    let id = '';
    const ENDPOINT = 'localhost:5000';
    async function submitAccount (e) {
        console.log(props.cookies['id'])
        e.preventDefault();

        socket.emit('login', { username });
        
        socket.on("lid", (response) => {
            password2 = response['password'];
            id = response['id']; console.log(id);
            console.log(password2)
        
        if (password2 != undefined) {
        try {
            if (bcrypt.compareSync(password, password2) == true) {

                setAccess(true);
                props.setCookie("id", id);
                console.log('works')
    
            }
            else {

                setErrorType('Invalid Password')
                setErrorMsg('There is an issue with your password. Please try again')
                setOpenModal(true)
                console.log(password);
                console.log(password2);
            }
        }
        catch {
            setErrorType('Invalid Username')
            setErrorMsg('This username does not exist. Please try another')
            setOpenModal(true)
        }
    }});

    }

    function handleClose() {
        setOpenModal(false);
    };

    useEffect(() => {
        socket = io(ENDPOINT);

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT]);

    return(       
        <div>
            <form>
            <input type="text" label='username'
                onChange={e => setUsername(e.target.value)}
            />
            <input type="password" 
                onChange={e => setPassword(e.target.value)}
            />
            </form>
            <button onClick={submitAccount}>Confirm</button>
            {access && <Redirect to="/home"/>}
            <Modal show={openModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{errorType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMsg}</Modal.Body>
                <Modal.Footer>
                    <button onClick={e => handleClose()}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}