import React, {Component} from 'react';
import World from "wrld.js"

import 'bootstrap/dist/css/bootstrap.min.css'

class Map extends Component {
    componentDidMount = () => {
        World.map("map", process.env.REACT_APP_WRLDJS);
        console.log(process.env.REACT_APP_WRLDJS);
    };

    render() {
        return (
            <div id="content" style={{position: "relative"}}>
                <div id="map" style={{height: "500px", width:"100%"}}/>
            </div>
        );
    }
}

export default Map;
