import React, { useEffect } from 'react';
import {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import io from 'socket.io-client';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";


let socket;
export default function Signup(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [errorType, setErrorType] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [access, setAccess] = useState(false);
    const characters = [];
    const gm = [];
    const ENDPOINT = 'localhost:5000';

    async function submitAccount(e) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        if (bcrypt.compareSync(password2, hash)) {

            e.preventDefault();

            socket.emit('signup', { username, hash, characters, gm });

            socket.on('duplicate', (response) => {
                if (response.duplicate == true) {
                    setErrorType('Username already taken')
                    setErrorMsg('This username is taken. Try another')
                    setUsername('')
                    setPassword('')
                    setPassword2('')
                    setOpenModal(true) 
                }
                else { 
                    socket.on('sid', (response) => {
                        console.log(response);
                        props.setCookie("id", response.id);
                    })
                    setAccess(true);
                }
            })
        }
        else {
            setErrorType('Incorrect Password');
            setErrorMsg('Your passwords do not match. Please try again')
            setUsername('')
            setPassword('')
            setPassword2('')
            setOpenModal(true)
        } 
    } 
    
    function cancelUser() {
        document.getElementById('createUserForm').reset();
    }

    const handleClose = () => {
        setOpenModal(false);
        cancelUser()
    };

    useEffect(() => {
        socket = io(ENDPOINT);

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT]);

    return (
        <div>
            <form id='createUserForm'>
            <input type="text" label='username' 
                onChange={e => setUsername(e.target.value)}
            />
            <input type="password"  
                onChange={e => setPassword(e.target.value)}
            />
            <input type="password" 
                onChange={e => setPassword2(e.target.value)}/>
            </form>
            <button onClick={submitAccount}>Confirm</button>
            <p>The results are{props.cookies['id']}</p>
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