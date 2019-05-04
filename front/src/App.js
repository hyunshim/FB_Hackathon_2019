import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Marks from './components/Marks';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Map from "./components/Map";

class App extends Component {

    render() {
        return (
            <div id="main">
                <BrowserRouter>
                    <Marks/>
                </BrowserRouter>
                <Map/>
            </div>
        );
    }
}

export default App;
