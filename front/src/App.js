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
        },
        isSelectingCoord: false
    };

    displayQuest = (quest) => {
        this.setState({
            displayQuest: quest
        })
    };

    createQuest = (location) => {
        console.log("Begin Create Quest");
        if (!location) {
            console.log("Select Location");

            this.setState({
                isSelectingCoord: true
            });
            return
        }
        console.log("Create Quest");

        this.setState({
            createCoordinates: {
                coordinates: location,
                type: "point"
            },
            createQuest:true,
        })
    };

    hideQuest = () => {
        this.setState({
            displayQuest: null
        })
    };
    hideCreate = () => {
        this.setState({
            createQuest: false,
            isSelectingCoord: false,
            createCoordinates: {
                coordinates: [0, 0],
                type: "point"
            },
        })
    };

    render() {
        return (
            <div id="main">
                <BrowserRouter>
                    <Profile createQuestCallback={this.createQuest}/>
                    {/* <Quests/> */}
                </BrowserRouter>
                <Map onDisplayQuest={this.displayQuest} selectCoords={this.state.isSelectingCoord} createQuestCallback={this.createQuest} cancelCreateQuest={this.hideCreate}/>
                <QuestViewer onClose={this.hideQuest} display={this.state.displayQuest}/>
                <QuestCreator onClose={this.hideCreate} open={this.state.createQuest}
                              location={this.state.coordinates}/>
            </div>
        );
    }
}

export default App;
