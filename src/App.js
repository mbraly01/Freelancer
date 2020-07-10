import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { CookiesProvider, withCookies, useCookies } from 'react-cookie';
import Home from './components/Home.js'
import Crew from './components/Crew.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Landing from './components/Landing.js';
import Character from './components/Character.js';
import Spider from './components/Creation/Spider.js';
import CharacterCreation from './components/Creation/CharacterCreation.js';
import Test from './components/Test.js';
import Test2 from './components/Test2.js';


function App() {
 
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  return (
        <div>
          <CookiesProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={(props) => <Landing {...props} cookies={cookies} setCookie={setCookie}/>}/>
                <Route exact path="/home" component={(props) => <Home {...props} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>              
                <Route exact path="/login" component={(props) => <Login {...props} setCookie={setCookie} cookies={cookies}/>}/>
                <Route exact path="/signup" component={(props) => <Signup {...props} cookies={cookies} setCookie={setCookie}/>}/>
                <Route exact path="/char" component= {(props) => <Character {...props} cookies={cookies}/>}/>
                <Route exact path="/charcreation" component={CharacterCreation}/>
                <Route exact path="/test2" component={Test2}/>
                <Route exact path="/spider" component={Spider}/>
                <Route exact path="/crew" component={(props) => <Crew {...props} cookies={cookies}/>}/>
              </Switch>
            </BrowserRouter>
            </CookiesProvider>
        </div>
    );
}

export default withCookies(App);