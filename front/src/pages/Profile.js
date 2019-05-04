import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FavouriteIcon from '@material-ui/icons/Favorite';

import avatar from '../images/default-avatar.png'
import { Container, Input, Modal } from 'reactstrap';
import './Profile.css';
import Quests from '../components/Quests';
import { get_user, create_quest } from '../Utils'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5ccd64118a8994419063f679",
            user: [],
            show: false,
            toggleCreateQuest: false,
        }

        this.toggleCreateQuest = this.toggleCreateQuest.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

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


    componentDidMount() {
        this.get_user();
    }

    render() {
        const profile = (
            <div style={{overflowY: "hidden"}}>
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
                    <div style={{ marginTop: "15px", width: "100%", height: "360px", overflowY: "scroll" }}><Quests /></div>
                </div>
            </div>
        );
        return (
            <div>
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