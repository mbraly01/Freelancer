import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Landing(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    let response = null;
    async function autoLogin() {

            if (props.cookies.id != null) {
                setLoggedIn(true);
            }
    }

    useEffect(() => {
        autoLogin()
        // props.setCookie(['id'])
    },[])

    return (
        <div>
        {loggedIn ? <Redirect to="/home"/>:
        <div>
            <Link to={{ pathname: '/login'}}>Login</Link>
            <Link to={{ pathname: '/signup'}}>Signup</Link>
        </div>
        }
        </div>
    )
}