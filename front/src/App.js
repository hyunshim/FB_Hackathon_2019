import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Routes, Switch } from '@upgrowth/reactkit/lib/router';

import routes from './routes';

import MapView from './pages/MapView';
import Profile from './pages/Profile';
import Quests from './components/Quests';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
    render() {
        return(
            <div id="main">
                <BrowserRouter>
                    <MapView/>
                    <Profile/>
                    {/* <Quests/> */}
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
