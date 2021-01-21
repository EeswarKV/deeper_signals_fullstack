import React from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import {Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import { userService, authenticationService } from '../../_services/index.js';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getAssesmentById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }


  handleClick(currentUser,contact) {
      this.props.history.push({ pathname: '/showreport', state: {uid: currentUser.id, assesmentid: contact.id}});
    } 
  
    render() {
        const { currentUser, userFromApi } = this.state;
        // const history = useHistory();
        // const handleClick = () => history.push('/showreport');
        console.log("currentUser", currentUser);
        console.log("userFromApi", userFromApi);
        return (
            <div>
                <h1>Home</h1>
                <p>You're logged in with React & JWT!!</p>
                <p>Your role is: <strong>{currentUser.role}</strong>.</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div>
                    Current user from secure api end point:
                    {userFromApi &&
                        // <ul>
                        //     <li>{currentUser.first_name} {currentUser.last_name}</li>
                        // </ul>

                        userFromApi.map(contact => {
                            return (
                            <Card key={contact.id} style={{ width: '50rem',margin: '10px' }}>
                            <Card.Img variant="top" src="src/resources/images/tile_image.png" />
                            <Card.Body>
                              {/* <Card.Title>Card Title</Card.Title> */}
                                        <Card.Text>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><div>Name: <span>{contact.name}</span></div></ListGroup.Item>
                                            <ListGroup.Item><div>Total users reolved: <span>{contact.users_resolved}</span></div></ListGroup.Item>
                                            <ListGroup.Item><div>Active: <span>{contact.active.toString()}</span></div></ListGroup.Item>
                                        </ListGroup>
                              </Card.Text>
                                        <Button variant="secondary" onClick={() => this.handleClick(currentUser, contact)}>Check Report</Button>
                            </Card.Body>
                          </Card>
                            );
                          })

                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;