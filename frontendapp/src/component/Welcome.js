import React from 'react'
import {Jumbotron} from "react-bootstrap";

export default class Welcome extends React.Component{
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to project management</h1>
                <p>
                    This is a platform to help manage project details of the company
                </p>
            </Jumbotron>
        )
    }
}