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
import QuestCreator from "./components/QuestCreator";

class App extends Component {

    state = {
        displayQuest: null,
        createQuest: false,
        createCoordinates: {
            coordinates: [0, 0],
            type: "point"
        }
    };

    displayQuest = (quest) => {
        this.setState({
            displayQuest: quest
        })
    };

    createQuest = (location) => {
        this.setState({
            createCoordinates: {
                coordinates: location,
                type: "point"
            }
        })
    };

    hideQuest = () => {
        this.setState({
            displayQuest: null
        })
    };
    hideCreate = () => {
        this.setState({
            createQuest: false
        })
    };

    render() {
        return (
            <div id="main">
                <BrowserRouter>
                    <Profile/>
                    {/* <Quests/> */}
                </BrowserRouter>
                {/*<Map onDisplayQuest={this.displayQuest}/>*/}
                <QuestViewer onClose={this.hideQuest} display={this.state.displayQuest}/>
                <QuestCreator onClose={this.hideCreate} open={this.state.createQuest}
                              location={this.state.coordinates}/>
            </div>
        );
    }
}

export default App;
