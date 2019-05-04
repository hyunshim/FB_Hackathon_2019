import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MapView from './pages/MapView';
import Profile from './pages/Profile';
// import Quests from './components/Quests';
import QuestSide from './pages/QuestSide';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Map from "./components/Map";
import QuestViewer from "./components/QuestViewer";
import Login from "./pages/Login";

class App extends Component {


    render() {
        return (
            <div id="main">
                <Router>
                    <div>
                        <Route exact path="/" component={Login} />
                        <Route path="/map" component={Profile} />
                    </div>
                </Router>,

            </div>
        );
    }
}

export default App;
