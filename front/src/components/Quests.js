import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { add_quest, get_all_quests, delete_quest } from '../Utils';

class Quests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
        }

        // this.get_all_quests = this.get_all_quests.bind(this);
    }



    get_all_quests() {
        console.log("In get_all_quests")
        get_all_quests().then(result => {
            console.log("asd", result)
            this.setState({quests: result})
        })
    }
    componentDidMount() {
        this.get_all_quests()
    }

    render() {
        console.log(this.state.quests)
        return (
            <div>
                asd
                {this.state.quests.map((quest) => {
                    console.log(quest);
                    return(
                        <div>asd</div>
                    );
                })}
            </div>
        );
    }
}

export default Quests;