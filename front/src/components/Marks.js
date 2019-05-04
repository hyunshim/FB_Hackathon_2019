import React, { Component } from 'react';
import {
    Button,
    Container,
    Table,
    Modal,
    Input
} from 'reactstrap';

import { add_mark, get_all_marks, delete_user, create_user, get_all_users } from '../Utils';

class Marks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marks: [],
            modal: false,

            users: [],
            name: "",
            ph: null,
            address: "",
        }

        this.addAssignment = this.addAssignment.bind(this);
        this.reloadSwitch = this.reloadSwitch.bind(this);
        this.toggleAddAssignment = this.toggleAddAssignment.bind(this);
        
        this.get_all_users = this.get_all_users.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePh = this.onChangePh.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
    }

    reloadSwitch() {
        this.get_all_users()
    }

    toggleAddAssignment() {
        this.setState({ modal: !this.state.modal })
        console.log("toggleAddAssignment", this.state.addAssignment)
    }

    addAssignment(name, grade) {
        add_mark(name, grade, Math.random() * (+100 - +49) + +49).then(result => {
            this.toggleAddAssignment()
            this.reloadSwitch()
        })
    }

    // CREATE USER
    toggleAddUser() {
        this.setState({ modal_user: !this.state.modal_user })
    }
    addUser(name, ph, address, experience, quests) {
        create_user(name, ph, address, experience, quests).then(result => {
            this.toggleAddUser()
            this.reloadSwitch()
        })
    }
    onChangeName(event) { this.setState({ name: event.target.value }); }
    onChangePh(event) { this.setState({ ph: event.target.value }); }
    onChangeAddress(event) { this.setState({ address: event.target.value }); }


    get_all_users() {
        get_all_users().then(result => { this.setState({ users: result.users }); })
    }

    delete_user(_id) {
        delete_user(_id).then(result => { this.reloadSwitch() })
    }

    componentDidMount() {
        this.get_all_users()
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.state.modal_user} toggle={this.toggleAddUser}>
                    <div style={{ width: "100%", padding: "20px" }}>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Input defaultValue="name" readOnly style={{ textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} disabled />
                                    </td>
                                    <td>
                                        <Input onChange={this.onChangeName} style={{ backgroundColor: "white", textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input defaultValue="ph" readOnly style={{ textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} disabled />
                                    </td>
                                    <td>
                                        <Input onChange={this.onChangePh} style={{ backgroundColor: "white", textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input defaultValue="address" readOnly style={{ textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} disabled />
                                    </td>
                                    <td>
                                        <Input onChange={this.onChangeAddress} style={{ backgroundColor: "white", textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <Button color="danger" style={{ fontSize: "12px" }} onClick={() => this.addUser(this.state.name, this.state.ph, this.state.address)}>ADD</Button>
                    </div>
                </Modal>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Phone Number </th>
                            <th> Address </th>
                            <th> Experience </th>
                            <th> Quests </th>
                            <th style={{ width: "150px" }}>
                                <Button color="dark" onClick={() => this.toggleAddUser()}>
                                    CREATE USER
                                    </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => {
                            return (
                                <tr>
                                    <th> {user.name} </th>
                                    <th> {user.ph} </th>
                                    <th> {user.address} </th>
                                    <th> {user.experience} </th>
                                    <th> {user.quests} </th>
                                    <th>
                                        <Button color="danger" onClick={() => this.delete_user(user._id)}>x</Button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        );
    }
}

export default Marks;