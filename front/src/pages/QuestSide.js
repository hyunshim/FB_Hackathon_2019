import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardColumns } from 'reactstrap';

import FavouriteIcon from '@material-ui/icons/Favorite';

import avatar from '../images/default-avatar.png'
import { Container } from 'reactstrap';
import './Profile.css';
// import Quests from './components/Quests';

import { get_user, get_all_quests} from '../Utils'


class QuestSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5ccd64118a8994419063f679",
            user: [],
            show: false,
            quests: [],
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
    get_all_quests() {
        get_all_quests().then(result => {
            console.log(result.quests)
            this.setState({quests: result.quests})
        })
    }

    componentDidMount() {
        this.get_user();
        this.get_all_quests();
    }

    render() {
        const profile = (
            // <div>asdasdasdasdasdasdasdasd></div>
            <div id="Quests">
            {this.state.quests.map((quest) => {
                return (
                    <div key={quest.id}>

                    <CardColumns >
                    <Card body outline color="secondary">
                        <CardImg top width="100%" src={quest.imgurl} alt="Card image cap" />
                        <CardBody>
                        <CardTitle>QUEST: {quest.name}</CardTitle> 
                        <CardTitle>FROM: {quest.author}</CardTitle>
                        <CardSubtitle>REWARD: {quest.reward}</CardSubtitle>
                        <CardText>{quest.description}</CardText>
                        <Button variant="contained" color="primary" >
                        Track Quest
                        </Button>
                        </CardBody>
                    </Card>
                    </CardColumns>
                    </div>
                )
            })}
            </div>
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
export default QuestSide;