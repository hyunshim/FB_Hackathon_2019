import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Profile from './pages/Profile';
// import Quests from './components/Quests';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Map from "./components/Map";
import QuestViewer from "./components/QuestViewer";
import QuestCreator from "./components/QuestCreator";
import Login from "./pages/Login";

class App extends Component {

    render() {
        return (
            <div id="main">
                <Router>
                    <Route exact path="/" component={Login}/>
                    <Route path="/map" component={Profile}/>
                </Router>,

                <Map onDisplayQuest={this.displayQuest} selectCoords={this.state.isSelectingCoord}
                     createQuestCallback={this.createQuest} cancelCreateQuest={this.hideCreate}/>
                <QuestViewer onClose={this.hideQuest} display={this.state.displayQuest}/>
                <QuestCreator onClose={this.hideCreate} open={this.state.createQuest}
                              location={this.state.coordinates}/>
            </div>
        );
    }
}

export default App;
