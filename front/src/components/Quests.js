import React from 'react';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardColumns
} from 'reactstrap';
import { get_all_quests, delete_quest } from '../Utils';

class Quests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
            distance: 0
        }
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
        this.get_all_quests();
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
        return (
            <div id="Quests">
                {this.state.quests.map((quest) => {
                    return (
                        <Card key={quest.id}>
                            <div style={{ padding: "5px" }}>
                                <div style={{ fontSize: "1.1rem" }}><b>{quest.name}</b></div>
                                <div>{this.distance(37.484116,-122.148244,quest.location[0],quest.location[1])}km away</div>
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