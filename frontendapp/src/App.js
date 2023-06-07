import logo from './logo.svg';
import './App.css';
import NavigationBar from "./component/NavigationBar";
import {Container,Row,Jumbotron, Col} from "react-bootstrap";
import Welcome from "./component/Welcome";
import Footer from "./component/Footer";
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ProjectList from "./component/ProjectList";
import UserList from "./component/UserList";
import Project from "./component/Project";

function App() {
    const marginTop = {
        marginTop:"20px"
    }
  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                <Switch>
                    <Route path="/" exact component={Welcome}/>
                    <Route path="/add" exact component={Project}/>
                    <Route path="/list" exact component={ProjectList}/>
                    <Route path="/userlist" exact component={UserList}/>
                </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;
