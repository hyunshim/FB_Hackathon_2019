import React from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardColumns } from 'reactstrap';
import {get_all_quests, delete_quest} from '../Utils';

class Quests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
        }
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
        this.get_all_quests();
    }

    render() {
        return(
            <div id="Quests">
            {this.state.quests.map((quest) => {
                return (
                    <div key={quest.id}>
                    <CardColumns>
                    <Card body outline color="secondary">
                        <CardImg top width="100%" src={quest.imgurl} alt="Card image cap" />
                        <CardBody>
                        <CardTitle>QUEST: {quest.name}</CardTitle> 
                        <CardTitle>FROM: {quest.author}</CardTitle>
                        <CardSubtitle>REWARD: {quest.reward}</CardSubtitle>
                        <CardText>{quest.description}</CardText>
                        <Button >Get Started</Button>
                        </CardBody>
                    </Card>
                    </CardColumns>
                    </div>
                )
            })}
            </div>
        );
    }

}

export default Quests;