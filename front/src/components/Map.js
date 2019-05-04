import React, {Component} from 'react';
import World from "wrld.js"
import Fab from '@material-ui/core/Fab';
import {MyLocation, RotateLeft, RotateRight, ThreeSixty} from '@material-ui/icons';

const WrldMarkerController = window.WrldMarkerController;


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
        orientation: 270,
        markers: {},
        follow: false,
    };


    conponentWillUnMount = () => {
        if (window.DeviceOrientationEvent) {
            window.removeEventListener("deviceorientation", this.handleRotation, true);
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

            // Lib included in index.html
            const placeMarker = new WrldMarkerController(map);
            this.setState({
                map: map,
            });

            map.precacheWithDetailedResult(this.props.initialPos, 2000);
            map.on("mousedown", this.onMouseDown);
            map.on("mouseup", this.onMouseUp);
        }
        this.placePointsOfInterest(map);
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.handleRotation, true);
        }
    };

    handleRotation = (event) => {
        if (this.state.follow) {
            const {alpha, beta, gamma} = event;
            const heading = parseInt(this.convertToCompassHeading(alpha, beta, gamma));

            console.log({heading, alpha, beta, gamma});

            this.setState({
                orientation: heading
            });

            if (this.state.map) {
                this.state.map.setCameraHeadingDegrees(heading);
            }
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

        if (!mouseMoved && map) {
            const {lat, lng} = event.latlng;
            let mark = World.marker([lat, lng], {title: "Test Marker"});
            mark.addTo(map);
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
            // headingDegrees: this.state.orientation,
            animate: true,
            durationSeconds: 0.5
        });
    };

    render() {
        const mapStyle = {
            width: "100%",
            height: "100%",
        };

        const buttons = {
            center: {
                position: "fixed",
                bottom: "50px",
                left: "50px",
                zIndex: 10,
            },
            left: {
                position: "fixed",
                bottom: "50px",
                right: "50px",
                zIndex: 10,

            },
            right: {
                position: "fixed",
                bottom: "50px",
                right: "150px",
                zIndex: 10,

            },
        };

        const wrapperStyle = {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: "-10"
        };

        const canWatchOrientation = window.DeviceOrientationEvent;
        return (

            <div id="content" style={wrapperStyle}>
                <Fab style={buttons.center} color="primary" aria-label="Return to Location" onClick={this.resetMapPos}>
                    <MyLocation/>
                </Fab>
                <div>
                    <Fab color="secondary" style={buttons.left} onClick={() => this.rotate(-1)}>
                        <RotateLeft/>
                    </Fab>
                    <Fab color="secondary" style={buttons.right} onClick={() => this.rotate(1)}>
                        <RotateRight/>
                    </Fab>
                </div>
                <div id="map" style={mapStyle}/>
            </div>
        );
    }

    convertToCompassHeading = (alpha, beta, gamma) => {
        // Convert degrees to radians
        let alphaRad = alpha * (Math.PI / 180);
        let betaRad = beta * (Math.PI / 180);
        let gammaRad = gamma * (Math.PI / 180);

        // Calculate equation components
        let cA = Math.cos(alphaRad);
        let sA = Math.sin(alphaRad);
        let cB = Math.cos(betaRad);
        let sB = Math.sin(betaRad);
        let cG = Math.cos(gammaRad);
        let sG = Math.sin(gammaRad);

        // Calculate A, B, C rotation components
        let rA = -cA * sG - sA * sB * cG;
        let rB = -sA * sG + cA * sB * cG;
        let rC = -cB * cG;

        // Calculate compass heading
        let compassHeading = Math.atan(rA / rB);

        // Convert from half unit circle to whole unit circle
        if (rB < 0) {
            compassHeading += Math.PI;
        } else if (rA < 0) {
            compassHeading += 2 * Math.PI;
        }

        // Convert radians to degrees
        compassHeading *= 180 / Math.PI;
        return compassHeading;
    };

    getRotationDegrees(alpha, beta, gamma) {

    }
}

export default Map;
