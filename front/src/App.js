import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import MapView from './pages/MapView';
import Profile from './pages/Profile';
// import Quests from './components/Quests';
import QuestSide from './pages/QuestSide';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Map from "./components/Map";
import QuestViewer from "./components/QuestViewer";

class App extends Component {

    state = {
        displayQuest: null
    };

    displayQuest = (quest) => {
        this.setState({
            displayQuest: quest
        })
    };

    hideQuest = () => {
        this.setState({
            displayQuest:null
        })
    };

    render() {
        return (
            <div id="main">
                <BrowserRouter>
                    <Profile/>
                    {/* <Quests/> */}
                </BrowserRouter>
                <Map onDisplayQuest={this.displayQuest}/>
                <QuestViewer onClose={this.hideQuest} display={this.state.displayQuest}/>
            </div>
        );
    }
}

export default App;
