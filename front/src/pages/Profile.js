import React from 'react';

import Button from '@material-ui/core/Button';
import { Card } from 'reactstrap';
import './Profile.css';

import { get_user } from '../Utils'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "5ccd49096a556504ac258e94",
            user: [],
            quests: ["a", "b", "c"]
        }
    }

    get_user() {
        get_user(this.state.user_id).then(result => {
            this.setState({ user: [result.user] })
        })
    }


    componentDidMount() {
        this.get_user()
    }

    render() {
        return (
            <div>
                {//<Button variant="contained" color="primary">asd</Button> -->
                }
                {/* {this.state.user.map((user) => {
                    return (
                        <div id="center">
                            <div id="title">{user.name}</div>
                            <div>{user.ph} | {user.address}</div>
                            <div>Exp: {user.experience}</div>
                        </div>
                    )
                })} */}

                {this.state.quests.map((quest) => {
                    return(
                        <Card body>{quest}</Card>
                    )
                })}
            </div>
        )
    }
}
export default Profile;