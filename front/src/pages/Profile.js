import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FavouriteIcon from '@material-ui/icons/Favorite';

import avatar from '../images/default-avatar.png'
import {Card, Input, Modal} from 'reactstrap';
import './Profile.css';
import {create_quest, delete_quest, get_all_quests, get_user} from '../Utils'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5ccd64118a8994419063f679",
            user: [],
            show: false,
            quests: [],
            distance: 0,
        };

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


    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    get_user() {
        get_user(this.state.user_id).then(result => {
            this.setState({user: [result.user]})
        })
    }


    handleChange({target}) {
        console.log(target.name, target.value)
        this.setState({[target.name]: target.value});
    }

    get_all_quests() {
        get_all_quests().then(result => {
            console.log(result.quests)
            this.setState({quests: result.quests})
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
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "M") {
            dist = dist * 0.8684
        }
        return dist.toFixed(2)
    }

    render() {
        const profile = (
            <div style={{overflowY: "hidden"}}>
                <div id="center" style={{width: "230px", marginTop: "20px"}}>
                    <div><img src={avatar} style={{borderRadius: "50%", width: "100px", height: "100px"}}/></div>

                    {//<Button variant="contained" color="primary">asd</Button> -->
                    }
                    {this.state.user.map((user) => {
                        return (
                            <div id="center" key={user._id}>
                                <div id="title">{user.name}</div>
                                <div>{user.ph}</div>
                                <div>{user.address}</div>
                                <div style={{display: "flex", justifyContent: "center"}}><FavouriteIcon
                                    style={{color: "red"}}/>{user.experience}</div>
                            </div>
                        )
                    })}
                    <Button onClick={() => this.props.createQuestCallback()} style={{marginTop: "10px", fontSize: "0.7rem"}}
                            variant="contained" color="primary">CREATE QUEST</Button>
                    <div style={{marginTop: "15px", width: "100%", height: "360px", overflowY: "scroll"}}>
                        <div id="Quests">
                            {this.state.quests.map((quest) => {
                                return (
                                    <Card key={quest.id}>
                                        <div onClick={() => this.triggerMapCenter(quest.location[0], quest.location[1])}
                                             style={{padding: "5px"}}>
                                            <div style={{fontSize: "1.1rem"}}><b>{quest.name}</b></div>
                                            <div>{this.distance(37.484116, -122.148244, quest.location[0], quest.location[1])}km
                                                away
                                            </div>

                                            {/* <Button onClick={() => this.delete_quest(quest.id)}>x</Button> */}
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>
                    <div style={{paddingLeft: "0px", paddingTop: "3px"}}>
                        <img src={avatar} style={{
                            border: "1.5px solid black",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px"
                        }}/>
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