import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Routes, Switch } from '@upgrowth/reactkit/lib/router';

import routes from './routes';

import Marks from './components/Marks';
import Profile from './pages/Profile';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
    render() {
        return(
            <div id="main">
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
