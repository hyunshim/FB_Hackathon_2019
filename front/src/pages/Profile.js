import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FavouriteIcon from '@material-ui/icons/Favorite';

import Map from "../components/Map";
import QuestViewer from "../components/QuestViewer";

import avatar from '../images/default-avatar.png'
import { Card, Container, Input, Modal } from 'reactstrap';
import './Profile.css';
import Quests from '../components/Quests';
import { get_user, create_quest, get_all_quests, delete_quest } from '../Utils'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5ccd64118a8994419063f679",
            user: [],
            show: false,
            toggleCreateQuest: false,
            quests: [],
            distance: 0,
        }

        this.toggleCreateQuest = this.toggleCreateQuest.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

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
            displayQuest: null
        })
    };

    toggleCreateQuest() { this.setState({ toggleCreateQuest: !this.state.toggleCreateQuest }) }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    get_user() {
        get_user(this.state.user_id).then(result => {
            this.setState({ user: [result.user] })
        })
    }

    create_quest() {
        let data = {
            name: this.state.name,
            author: this.state.author,
            location: [this.state.latitude, this.state.longitude],
            reward: this.state.reward,
            description: this.state.description,
            imgurl: this.state.imgurl,
            icon: this.state.icon,
        }
        create_quest(data).then(result => {
            console.log("create_quest:", result)
        })
        this.toggleCreateQuest()

    }

    handleChange({ target }) {
        console.log(target.name, target.value)
        this.setState({ [target.name]: target.value });
    }

    get_all_quests() {
        get_all_quests().then(result => {
            console.log(result.quests)
            this.setState({ quests: result.quests })
        })
    }
    delete_quest(id) {
        delete_quest(id).then(result => {
            console.log(result);
        })
    }

    componentDidMount() {
        this.get_user();
        this.get_all_quests();
    }

    triggerMapCenter(lat, lng) {
        this.refs.child.testCall(lat, lng);
    }

    distance(lat1, lon1, lat2, lon2, unit) {
        let radlat1 = Math.PI * lat1/180
        let radlat2 = Math.PI * lat2/180
        let theta = lon1-lon2
        let radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="M") { dist = dist * 0.8684 }
        return dist.toFixed(2)
    }
    render() {
        const profile = (
            <div style={{ overflowY: "hidden" }}>
                <div id="center" style={{ width: "230px", marginTop: "20px" }}>
                    <div><img src={avatar} style={{ borderRadius: "50%", width: "100px", height: "100px" }} /></div>

                    {//<Button variant="contained" color="primary">asd</Button> -->
                    }
                    {this.state.user.map((user) => {
                        return (
                            <div id="center" key={user._id}>
                                <div id="title">{user.name}</div>
                                <div>{user.ph}</div>
                                <div>{user.address}</div>
                                <div style={{ display: "flex", justifyContent: "center" }}><FavouriteIcon style={{ color: "red" }} />{user.experience}</div>
                            </div>
                        )
                    })}
                    <Button onClick={() => this.toggleCreateQuest()} style={{ marginTop: "10px", fontSize: "0.7rem" }} variant="contained" color="primary">CREATE QUEST</Button>
                    <div style={{ marginTop: "15px", width: "100%", height: "360px", overflowY: "scroll" }}>
                        <div id="Quests">
                            {this.state.quests.map((quest) => {
                                return (
                                    <Card key={quest.id}>
                                        <div onClick={() => this.triggerMapCenter(quest.location[0], quest.location[1])} style={{ padding: "5px" }}>
                                            <div style={{ fontSize: "1.1rem" }}><b>{quest.name}</b></div>
                                            <div>{this.distance(37.484116, -122.148244, quest.location[0], quest.location[1])}km away</div>
                                            
                                            {/* <Button onClick={() => this.delete_quest(quest.id)}>x</Button> */}
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <Map onDisplayQuest={this.displayQuest} ref="child" />
                <QuestViewer onClose={this.hideQuest} display={this.state.displayQuest} />

                <Modal isOpen={this.state.toggleCreateQuest}>
                    <div style={{ width: "100%", padding: "20px" }}>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr><td>Create New Quest</td></tr>
                                {["name", "author", "latitude", "longitude", "reward", "description", "imgurl", "icon"].map((key) => {
                                    return (
                                        <tr>
                                            <td>
                                                <Input defaultValue={key} readOnly style={{ textTransform: "capitalize", textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} disabled />
                                            </td>
                                            <td>
                                                <Input name={key} onChange={this.handleChange} style={{ backgroundColor: "white", textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <div id="center">
                        <Button variant="contained" color="primary" style={{ marginTop: "12px", fontSize: "12px" }} onClick={() => this.create_quest()}>CONFIRM</Button>
                        <Button variant="contained" color="secondary" style={{ marginLeft: "5px", marginTop: "12px", fontSize: "12px" }} onClick={() => this.toggleCreateQuest()}>CANCEL</Button></div>
                    </div>
                </Modal>
                <Button onClick={this.toggleDrawer('left', true)}>
                    <div style={{ paddingLeft: "0px", paddingTop: "3px" }}>
                        <img src={avatar} style={{
                            border: "1.5px solid black",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px"
                        }} />
                    </div>
                </Button>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {profile}
                    </div>
                </Drawer>
            </div>
        )
    }
}
export default Profile;