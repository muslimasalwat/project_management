import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {faEdit, faList, faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default class ProjectList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projects : []
        }
    }
    componentDidMount() {
        // axios.get('http://localhost:8080/api/v1/book')
        //     .then(response => console.log(response.data));
        axios.get('http://localhost:8080/api/v1/project')
            .then(response => response.data)
            .then((data) =>{
                this.setState({projects:data});
                console.log(data);
            });
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Project List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant={"dark"}>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>ProjectManager</th>
                            <th>Project Number</th>
                            <th>Location</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.projects.length === 0 ?
                        <tr align={"center"}>
                            <td colSpan={6}>{this.state.projects.length} Projects Available</td>
                        </tr> :
                            this.state.projects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        <Image src={project.coverPhotoURL} roundedCircle withd="25" height="25"/> {project.title}
                                    </td>
                                    <td>{project.ProjectManager}</td>
                                    <td>{project.ProjectNumber}</td>
                                    <td>{project.Location}</td>
                                    <td>{project.Cost}</td>

                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                            <Button size={"sm"}variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}