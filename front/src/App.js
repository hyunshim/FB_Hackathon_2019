import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import Quests from './components/Quests';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from "./pages/Login";
import AppParent from "./components/AppParent";

class App extends Component {

    render() {
        return (
            <div id="main">
                <Router>
                    <Route exact path="/" component={Login}/>
                    <Route path="/map" component={AppParent}/>
                </Router>,
            </div>
        );
    }
}

export default App;
