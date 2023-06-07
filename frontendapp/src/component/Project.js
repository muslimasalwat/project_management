import React, { Component } from 'react'
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faUndo, faList, faEdit} from "@fortawesome/free-solid-svg-icons";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import axios from "axios";
import MyToast from "./MyToast";

export default class Project extends Component{
    constructor(props) {
        super(props);
        this.state= this.initialState;
        this.projectChange = this.projectChange.bind(this);
        this.submitProject = this.submitProject.bind(this);
    }
    initialState ={
        id:'',
        title:'',
        projectManager:'',
        coverPhotoURL:'',
        projectNumber:'',
        cost:'',
        location:'',
    }
    resetProject = () => {
        this.setState(() => this.initialState);
    }
    submitProject = event =>{
        event.preventDefault();
        const project = {
            title:this.state.title,
            projectManager:this.state.projectManager,
            coverPhotoURL:this.state.coverPhotoURL,
            projectNumber:this.state.projectNumber,
            cost:this.state.cost,
            location:this.state.location,
        };

        axios.post("http://localhost:8080/api/v1/project",project)
            .then(response => {
               if(response.data !=null){
                   this.setState({"show": true});
                   setTimeout(() => this.setState({"show":false}), 3000);
               }else{
                   this.setState({"show": false});
               }
            });
        this.setState(this.initialState);
    }
    projectChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }    
    projectList = () => {
        return this.props.history.push("/list");
    }
    componentDidMount() {
        const projectId = +this.props.match.params.id;
        if(projectId){
            this.findProjectById(projectId);
        }
    }
    findProjectById = (projectId) => {
        axios.get("http://localhost:8080/api/v1/project/"+projectId)
            .then(response =>{
                if(response.data != null){
                    this.setState({
                        id: response.data.id,
                        title:response.data.title,
                        projectManager:response.data.projectManager,
                        coverPhotoURL:response.data.coverPhotoURL,
                        projectNumber:response.data.projectNumber,
                        cost:response.data.cost,
                        location:response.data.location,
                    });
                }
            }).catch((error) =>{
            console.error("Error-"+error);
        });
    }
    updateProject = event =>{
        event.preventDefault();
        const project = {
            id: this.state.id,
            title:this.state.title,
            projectManager: this.state.projectManager,
            coverPhotoURL: this.state.coverPhotoURL,
            projectNumber: this.state.projectNumber,
            cost: this.state.cost,
            location: this.state.location,
        };

        axios.put("http://localhost:8080/api/v1/project",project)
            .then(response => {
                if(response.data !=null){
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.projectList(), 3000);
                }else{
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    }
    render() {
        const {title,projectManager,coverPhotoURL,projectNumber,cost,location} = this.state;
        return (
            <div>
                <div style={{"display":this.state.show ? "block":"none"}}>
                    <MyToast children={{show: this.state.show, message:"Project saved successfully"}} />
                </div>
              <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Project" : "Add New Project"}</Card.Header>
                <Form onReset={this.resetProject} onSubmit={this.state.id ? this.updateProject : this.submitProject} id="projectFormId">
                    <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        value={title}
                                        onChange={this.projectChange}
                                        type="text"
                                        name="title"
                                        className={"bg-dark text-white"}
                                        placeholder="Project Title" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>ProjectManager</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="author"
                                        value={projectManager}
                                        onChange={this.projectChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Project Manager" />
                                </Form.Group>
                            </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Cover Photo URL</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="coverPhotoURL"
                                    value={coverPhotoURL}
                                    onChange={this.projectChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Cover Photo URL" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Project Number</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="isbnNumber"
                                    value={projectNumber}
                                    onChange={this.projectChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Project Number" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Cost</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    value={cost}
                                    onChange={this.projectChange}
                                    type="text"  name="cost"
                                    className={"bg-dark text-white"}
                                    placeholder="Cost" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    value={location}
                                    onChange={this.projectChange}
                                    type="text"
                                    name="location"
                                    className={"bg-dark text-white"}
                                    placeholder="Location" />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign": "right"}}>
                    <Button size ="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                    </Button>{' '}
                       <Button size ="sm" variant="primary" type="reset">
                           <FontAwesomeIcon icon={faUndo} /> Reset
                       </Button>{' '}
                       <Button size ="sm" variant="primary" type="button" onClick={this.projectList.bind()}>
                           <FontAwesomeIcon icon={faList} /> Project List
                       </Button>
                   </Card.Footer>
                </Form>
            </Card>
            </div>
        );
    };
}