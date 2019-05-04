import React, {Component} from 'react';
import World from "wrld.js"
import Fab from '@material-ui/core/Fab';
import {MyLocation, RotateLeft, RotateRight, ThreeSixty} from '@material-ui/icons';
import QuestViewerWrapped from "./QuestViewer";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

const WrldMarkerController = window.WrldMarkerController;
const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});


class Map extends Component {

    static defaultProps = {
        initialPos: [37.484116, -122.148244],
        defaultZoom: 16,
        quests: [{
            "name": "I lost my cat",
            "author": 123,
            "location": {"coordinates": [37.484116, -122.148244], "type": "Point"},
            "date": "2019-05-04T11:03:17.961Z",
            "reward": "lol",
            "comments": [{
                posted: "2019-06-04T11:03:17.961Z",
                author: "John Smith",
                text: "Oh no! hope you find him soon!",
            }, {
                posted: "2019-05-16T11:03:17.961Z",
                author: "John Smith",
                text: "So Cute!",
            },],
            "description": "He's a 8 year old chonk, I really miss him, please return him",
            "imgurl": "https://i.imgur.com/EaY09jQ.jpg",
            "icon": "vet",
            "id": "5ccd7175f780892f6b6cf523"
        }],
        onDisplayQuest: (point) => {
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
        let controller = this.state.markerController;
        if (!this.state.map) {
            map = World.map("map", process.env.REACT_APP_WRLDJS, {
                center: this.props.initialPos,
                zoom: this.props.defaultZoom,
                orientation: this.state.orientation
            });

            // Lib included in index.html
            controller = new WrldMarkerController(map);
            console.log(controller);
            this.setState({
                map: map,
                markerController: controller
            });

            map.precacheWithDetailedResult(this.props.initialPos, 2000);
            map.on("mousedown", this.onMouseDown);
            map.on("mouseup", this.onMouseUp);
        }
        this.placePointsOfInterest(map, controller);
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
            mouseDownLoc: event.layerPoint,
            mouseDownOverride: true,
        });
    };

    onMouseUp = (event) => {
        const mouseUpLoc = event.layerPoint;
        const {mouseDownLoc, map, markerController} = this.state;
        const {selectCoords} = this.props;
        const mouseMoved = mouseUpLoc.distanceTo(mouseDownLoc) > 3;
        markerController.deselectMarker();
        console.log("Mouse Up");
        if (!mouseMoved && map && selectCoords) {
            const {lat, lng} = event.latlng;
            console.log(`Selecting ${lat},${lng}`);
            this.props.createQuestCallback([lat, lng]);
        }
    };


    placePointsOfInterest = (map, controller) => {
        let markers = this.state.markers;
        let points = this.props.quests;

        for (let index in points) {
            if (points.hasOwnProperty(index)) {
                let point = points[index];
                console.log(point);
                if (markers.hasOwnProperty(point.id)) {
                    markers[point.id].remove()
                }
                let [lat, lng] = point.location.coordinates;
                let mark = controller.addMarker(point.id, [lat, lng], {iconKey: point.icon});
                let circle = window.L.circle(point.location.coordinates, {
                    color: "red",
                    fillOpacity: 0,
                    radius: 200.0
                });

                markers[point.id] = mark;
                // circle.addTo(map);
                mark.addTo(map);

                mark.on("click", (event) => {
                    controller.selectMarker(point.id);
                    this.props.onDisplayQuest(point);
                })
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

        const {selectCoords, classes} = this.props;

        return (

            <div id="content" style={wrapperStyle}>
                <Fab style={buttons.center} color="primary" aria-label="Return to Location" onClick={this.resetMapPos}>
                    <MyLocation/>
                </Fab>
                {window.DeviceOrientationEvent ?
                    <Fab color="secondary" style={buttons.left}
                         onClick={() => this.setState({follow: !this.state.follow})}>
                        <ThreeSixty/>
                    </Fab>
                    :
                    <div>


                        <Fab color="secondary" style={buttons.left} onClick={() => this.rotate(-1)}>
                            <RotateLeft/>
                        </Fab>
                        < Fab color="secondary" style={buttons.right} onClick={() => this.rotate(1)}>
                            <RotateRight/>
                        </Fab>
                    </div>
                }

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.selectCoords}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Where did you lose the pet?</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.props.cancelCreateQuest}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
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

export default withStyles(styles)(Map);
