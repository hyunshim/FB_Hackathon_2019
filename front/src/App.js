import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import MapView from './pages/MapView';
import Profile from './pages/Profile';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Map from "./components/Map";

class App extends Component {

    render() {
        return (
            <div id="main">
                <BrowserRouter>
                    <Profile/>
                </BrowserRouter>
                <Map/>
            </div>
        );
    }
}

export default App;
