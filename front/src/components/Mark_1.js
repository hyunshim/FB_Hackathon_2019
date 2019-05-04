import React, { Component } from 'react';
import { 
    Button,
    Container, 
    Table,
    Modal,
    Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { add_mark, get_all_marks, delete_mark } from '../Utils';

class Marks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marks: [],
            modal: false,
            title: null,
            mark: null,
        }

        this.addAssignment = this.addAssignment.bind(this);
        this.get_marks = this.get_marks.bind(this);
        this.reloadSwitch = this.reloadSwitch.bind(this);
        this.toggleAddAssignment = this.toggleAddAssignment.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeMark = this.onChangeMark.bind(this);
    }

    reloadSwitch() {
        this.get_marks()
    }

    onChangeTitle(event) {
        this.setState({
            title: event.target.value.toLowerCase()
        });
    }
    onChangeMark(event) {
        this.setState({
            mark: event.target.value
        });
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
    get_marks() {
        get_all_marks().then(result => { this.setState({marks: result.marks});})
    }
    
    delete_mark(_id) {
        delete_mark(_id).then(result => {this.reloadSwitch()})   
    }
    
    componentDidMount() {
        this.get_marks()
    }
    
    render() {
        return(
            <Container>
                <Modal isOpen={this.state.modal} toggle={this.toggleAddAssignment}>
                    <div style={{width: "100%", padding: "20px"}}>
                        <table style={{width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Input defaultValue="Title" readOnly style={{ textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} disabled />
                                    </td>
                                    <td>
                                        <Input onChange={this.onChangeTitle} style={{ backgroundColor: "white", textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input defaultValue="Mark" readOnly style={{ textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} disabled />
                                    </td>
                                    <td>
                                        <Input onChange={this.onChangeMark} style={{ backgroundColor: "white", textAlign: "center", borderRadius: "0px", height: "35px", fontSize: "12px" }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Button color="dark" style={{fontSize: "12px"}} onClick={() => this.addAssignment(this.state.title, this.state.mark)}>ADD</Button>
                    </div>
                </Modal>
                <TransitionGroup className="marks-list">
                    <Table hover style={{width: "100%"}}>
                        <thead>
                            <tr>
                                <th> Assignment </th>
                                <th> Mark </th>
                                <th style={{width: "150px"}}> 
                                    <Button color="dark" onClick={() => this.toggleAddAssignment()}>
                                        ADD MARK
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.marks.map((assignment) => {
                                return(     
                                    <CSSTransition key={assignment.id} timeout={500} classNames="fade">
                                        <tr>                                            
                                            <th> {assignment.title} </th>
                                            <th> {assignment.score} </th>
                                            <th> 
                                                <Button
                                                    variant="danger" onClick={() => this.delete_mark(assignment.id)}
                                                >
                                                    &times;
                                                </Button>
                                            </th>
                                        </tr>   
                                    </CSSTransition>
                                );
                            })}
                        </tbody>
                    </Table>
                </TransitionGroup>
            </Container>
        );
    }
}

export default Marks;