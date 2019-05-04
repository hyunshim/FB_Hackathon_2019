import React, {Component} from 'react';
import World from "wrld.js"
import {Button} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css'


class Map extends Component {

    static defaultProps = {
        initialPos: [37.484116, -122.148244],
        defaultZoom: 16,
        pointsOfInterest: [{
            "name": "I lost my cat",
            "author": 123,
            "location": {"coordinates": [37.484116, -122.148244], "type": "Point"},
            "date": "2019-05-04T11:03:17.961Z",
            "reward": "lol",
            "comments": [],
            "description": "He's a 8 year old chonk, I really miss him, please return him",
            "imgurl": "alert",
            "id": "5ccd7175f780892f6b6cf523"
        }],
        createPointOfInterestCallback: (lat, long) => {
        }
    };

    state = {
        orientation: 180,
        markers: {}
    };


    conponentWillUnMount = () => {
        if (window.DeviceOrientationEvent) {
            // window.removeEventListener("deviceorientation", this.handleRotation, true);
        }

    };

    componentDidMount = () => {
        let map = this.state.map;
        if (!this.state.map) {
            map = World.map("map", process.env.REACT_APP_WRLDJS, {
                center: this.props.initialPos,
                zoom: this.props.defaultZoom,
                orientation: this.state.orientation
            });
            this.setState({
                map: map,
            });

            map.precacheWithDetailedResult(this.props.initialPos, 2000);
            map.on("mousedown", this.onMouseDown);
            map.on("mouseup", this.onMouseUp);
        }
        this.placePointsOfInterest(map);
        if (window.DeviceOrientationEvent) {
            // window.addEventListener("deviceorientation", this.handleRotation, true);
        }
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
    };

    handleRotation = (event) => {
        const alpha = event.alpha;
        const beta = event.alpha;

        this.setState({
            orientation: beta
        });

        if (this.state.map) {
            this.state.map.setCameraHeadingDegrees(beta).setCameraTiltDegrees(alpha);
        }
    };


    onMouseDown = (event) => {
        this.setState({
            mouseDownLoc: event.layerPoint
        });
    };

    onMouseUp = (event) => {
        const mouseUpLoc = event.layerPoint;
        const {mouseDownLoc, map} = this.state;
        const mouseMoved = mouseUpLoc.distanceTo(mouseDownLoc) > 3;

        if (!mouseMoved) {
            const latlng = event.latlng;
            // latlng["alt"] = 0;
            console.log(latlng);
            const marker = World.marker(latlng, {
                elevation: 0,
                elevationMode: "heightAboveGround",
                iconKey: "alert"
            }).addTo(map);
        }
    };


    placePointsOfInterest = (map) => {
        let markers = this.state.markers;
        let points = this.props.pointsOfInterest;

        for (let index in points) {
            if (points.hasOwnProperty(index)) {
                let point = points[index];
                console.log(point);
                if (markers.hasOwnProperty(point.id)) {
                    markers[point.id].remove()
                }
                let mark = World.marker(point.location.coordinates, {title: point.name, iconKey: point.icon});
                mark.addTo(map);
                markers[point.id] = mark;
            }
        }
        this.setState({
            markers: markers
        })
    };


    rotate = (dir) => {
        const new_orientation = this.state.orientation + 15 * dir;
        this.setState({
            orientation: new_orientation
        });
        this.state.map.setCameraHeadingDegrees(new_orientation);

    };

    resetMapPos = () => {

        this.state.map.setView(this.props.initialPos, this.props.defaultZoom, {
            headingDegrees: this.state.orientation,
            animate: true,
            durationSeconds: 2
        });
    };

    render() {
        const mapStyle = {
            width: "100%",
            height: "100%",
            zIndex: "-100"
        };

        const buttons = {
            rotate: {
                position: "fixed",
                bottom: "50px",
                left: "50px",
            },
            left: {
                position: "fixed",
                bottom: "50px",
                right: "100px",
            },
            right: {
                position: "fixed",
                bottom: "50px",
                right: "50px",
            },
        };

        const wrapperStyle = {
            // position: "fixed",
            top: 0,
            left: 0,
            width: "500px",
            height: "500px",
            zIndex: "-100"
        };

        return (

            <div id="content" style={wrapperStyle}>
                <Button style={buttons.rotate} onClick={this.resetMapPos}>O</Button>
                {!window.DeviceOrientationEvent && (
                    <div>
                        <Button style={buttons.left} onClick={() => this.rotate(-1)}>L</Button>
                        <Button style={buttons.right} onClick={() => this.rotate(1)}>R</Button>
                    </div>
                )
                }
                <div id="map" style={mapStyle}/>
            </div>
        );
    }
}

export default Map;
