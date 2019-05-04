import React from 'react';

import {Card, Button} from 'reactstrap';

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
                    <Card key={quest.id}>
                    <div style={{padding: "5px"}}>
                        <div style={{fontSize: "1.1rem"}}><b>{quest.name}</b></div>
                        <div>5 Km away</div>
                        {/* <div>title: {quest.name}</div>
                        <div>user: {quest.author}</div>
                        <div>description: {quest.description}</div>
                        <div>reward: {quest.reward}</div>
                        <div>imgurl: {quest.imgurl}</div>
                        <div>location: {quest.location.coordinates}</div>
                        <div>date: {quest.date}</div>
                        <div>comments: {quest.comments[0]}</div> */}
                        {/* <Button onClick={() => this.delete_quest(quest.id)}>x</Button> */}
                    </div>
                    </Card>
                )
            })}
            </div>
        );
    }

}

export default Quests;