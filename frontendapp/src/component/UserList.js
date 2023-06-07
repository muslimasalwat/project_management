import React, {Component} from 'react'
//import Card from "react-bootstrap/Card";
//import Table from "react-bootstrap/Table";
import {Card, Table, InputGroup,FormControl} from "react-bootstrap";
import MyToast from './MyToast';
import {faEdit, faList, faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "react-bootstrap/Image";
import {faUsers, faStepBackward, faFastBackward, faStepForward, faFastForward} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import ButtonGroup from "react-bootstrap/ButtonGroup";

export  default class UserList extends Component{
    constructor(props) {
            super(props);
            this.state = {
                users : [],
                currentPage : 1,
                usersPerPage : 5
            };
    }
 
    componentDidMount() {
    this.findAllRandomUsers();
    }
 
    findAllRandomUsers(){
       axios.get('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
            .then(response => response.data)
            .then((data) =>{
                 this.setState({users:data});
                  console.log(data);
                });
 
 
    };
 
    changePage = event => {
     this.setState({
       [event.target.name]: parseInt(event.target.value)
     });
    };
 
    firstPage = () => {
    if(this.state.currentPage > 1){
       this.setState({currentPage : 1});
    }
 
    };
 
    prevPage = () => {
    if(this.state.currentPage > 1){
          this.setState({currentPage : this.set.currentPage - 1});
       }
 
       };
 
    lastPage = () => {
    if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
             this.setState({currentPage : Math.ceil(this.state.users.length / this.state.usersPerPage)});
          }
 
       };
 
    nextPage = () => {
    if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
             this.setState({currentPage : this.state.currentPage + 1});
          }
 
       };
 
 
 
    render(){
       const {users, currentPage, usersPerPage} = this.state;
       const lastIndex = currentPage * usersPerPage;
       const firstIndex = lastIndex - usersPerPage;
       const currentUsers = users.slice(firstIndex, lastIndex);
       const totalPages = users.length / usersPerPage;
       const pgNumCSS = {
        color: "white",
        width: "40px",
        fontWeight: "bold",
        textAlign: "center"
 
       };
 
 
    return(
    <div>
    <Card className={"border border-light bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> User List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"dark"}>
                            <thead>
                               <tr>
                                   <td> Name</td>
                                   <td>Email</td>
                                   <td>Address</td>
                                   <td>Created</td>
                                   <td>Balance</td>
                               </tr>
                            </thead>
                            <tbody>
                            {users.length === 0?
                               <tr align= "center">
                               <td colSpan="6">No Users Available</td>
                               </tr> :
                               currentUsers.map((user, index) => (
                                    <tr key={index}>
                                    <td>{user.first+" "+ user.last}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.created}</td>
                                    <td>{user.balance}</td>
                                    </tr>
                               ))
 
 
                            }
 
 
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{"float":"left"}}>
                          Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                           <InputGroup size="sm">
                               <InputGroup.Prepend>
                                      <Button type="Button" variant="outline-info" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                                         <FontAwesomeIcon icon={faFastBackward} /> First
                                      </Button>
                                      <Button type="Button" variant="outline-info" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                                         <FontAwesomeIcon icon={faStepBackward} /> Previous
                                      </Button>
                               </InputGroup.Prepend>
                               <FormControl style={pgNumCSS} className={"bg-dark"} name="currentPage" value={currentPage} onChange={this.changePage}/>
                               <InputGroup.Append>
                                      <Button type="Button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                         <FontAwesomeIcon icon={faStepForward} /> Next
                                      </Button>
                                      <Button type="Button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
                                         <FontAwesomeIcon icon={faFastForward} /> Last
                                      </Button>
                               </InputGroup.Append>
                           </InputGroup>
                        </div>
 
                    </Card.Footer>
                    </Card>
    </div>
    );
 
    }
 
 }