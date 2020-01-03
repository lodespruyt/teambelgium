import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import './App.css';


export default class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Container fluid>
          <Row>
            <Col ><div><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
            </div></Col>
            <Col><iframe src="http://pgca-backend.openode.io/stream/?name=spruyt"></iframe></Col>
            <Col>3 of 4</Col>
            <Col>4 of 4</Col>
          </Row>

        </Container>
      </div>)
  }
}
