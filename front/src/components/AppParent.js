import Map from "./Map";
import QuestViewer from "./QuestViewer";
import QuestCreator from "./QuestCreator";
import React from "react";
import Profile from "../pages/Profile";

class AppParent extends Component {
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
            createQuest: true,
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
        return <div>
            <Profile createQuestCallback={this.createQuest}/>
            <Map onDisplayQuest={this.displayQuest} selectCoords={this.state.isSelectingCoord}
                 createQuestCallback={this.createQuest} cancelCreateQuest={this.hideCreate}/>
            <QuestViewer onClose={this.hideQuest} display={this.state.displayQuest}/>
            <QuestCreator onClose={this.hideCreate} open={this.state.createQuest}
                          location={this.state.coordinates}/>
        </div>
    }
}