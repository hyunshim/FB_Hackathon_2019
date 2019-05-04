import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FavouriteIcon from '@material-ui/icons/Favorite';

import avatar from '../images/default-avatar.png'
import { Container } from 'reactstrap';
import './Profile.css';

import { get_user } from '../Utils'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5ccd64118a8994419063f679",
            user: [],
            show: false,
        }
    }

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

    componentDidMount() {
        this.get_user()
    }

    render() {
        const profile = (
            <Container>
                <div id="center" style={{ width: "230px", marginTop: "20%" }}>
                    <div><img src={avatar} style={{ borderRadius: "50%", width: "110px", height: "110px" }} /></div>

                    {//<Button variant="contained" color="primary">asd</Button> -->
                    }
                    {this.state.user.map((user) => {
                        return (
                            <div id="center">
                                <div id="title">{user.name}</div>
                                <div>{user.ph}</div>
                                <div>{user.address}</div>
                                <div style={{ display: "flex", justifyContent: "center" }}><FavouriteIcon style={{ color: "red" }} />{user.experience}</div>
                            </div>
                        )
                    })}
                    <Button style={{ marginTop: "20px", fontSize: "0.7rem" }} variant="contained" color="primary">CREATE QUEST</Button>

                </div>
            </Container>
        )
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