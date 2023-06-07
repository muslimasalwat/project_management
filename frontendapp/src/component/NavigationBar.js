import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends React.Component{
    render() {
        return (
            <Navbar bg="success" variant="dark">
                <Link to={""} className="navbar-brand">
                    Project Management Homepage
                </Link>
                <Nav className="mr-auto">
                    <Link to={"/add"} className="nav-link">Add Project</Link>
                    <Link to={"/list"} className="nav-link">Project List</Link>
                    <Link to={"/userlist"} className="nav-link">User List</Link>
                </Nav>
            </Navbar>
        );
    }
}