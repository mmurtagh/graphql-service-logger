import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import JumboTron from 'react-bootstrap/Jumbotron'
import moment from 'moment'
import fetch from 'node-fetch'
import testData from './testdata.json'
import Alert from 'react-bootstrap/Alert'

import { ServiceCall } from './ServiceCall'
import { QueryDetail } from './QueryDetail'


export function App(props) {
  const [ requests, setRequests ] = useState([])
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setRequests(testData)
    } else {
      poll()
    }
  }, [])

  const renderRequest = (
    {
      id,
      name,
      timeStamp,
      isErrored,
    },
    index
  ) => {    
    return (
      <ListGroup.Item
        action
        eventKey={id}
        variant={isErrored ? "danger" : "dark"}
      >
        <Container>
          <Row>
            <Col style={{ fontWeight: 'bold' }}>
              {name}
            </Col>
            <Col style={{ textAlign: 'right' }}>
              {moment(timeStamp).format('h:mm:ss a MM/DD')}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    )  
  }

  const renderDetail = (request) => {
    const { id, serviceCalls, isErrored } = request

    return (
      <Tab.Pane style={{ height: '100%', width: '100%' }} eventKey={id}>
        <Card style={{ height: '100%', width: '100%', overflow: 'scroll' }} bg="dark" text="white" >
          <Card.Body style={{ width: '100%' }}>
            <Card.Title>Query Details</Card.Title>
            {isErrored &&
              <Alert variant="danger">
                An error was thrown while executing this query.
              </Alert>
            }
            <QueryDetail {...request} />
            <Card.Title style={{ paddingTop: 16}}>Service Calls</Card.Title>
            {serviceCalls.map((serviceCall) => {
              return <ServiceCall {...serviceCall} />
            })}
          </Card.Body>
        </Card>
      </Tab.Pane>
    )
  }

  const poll = () => {
    fetch('http://localhost:5000/log/service-request')
      .then(async (res) => {
        const currentRequests = await res.json()
        if (currentRequests.length !== requests.length) {
          setRequests(currentRequests)
        }

        setTimeout(poll, 250)
      })
      .catch((e) => {
        setTimeout(poll, 2000)
      })
  }

  return (
    <div style={{ margin: 16 }}>
      <JumboTron as={Card} bg="dark" text="white">
        <h1 style={{ alignSelf: 'center' }}>GraphQL Service Logger</h1>
      </JumboTron>
      <Tab.Container style id="list-group-tabs-example" >
        <Row style={{ justifyContent: 'center', height: '60vh' }}>
          <Col className="test" style={{ height: '100%' }} md={4}>
            <ListGroup
              as={Card}
              bg="dark"
              text="white"
              style={{ height: '100%' }}
            >
              <Card.Body
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch'
                  
                }}                  
              >
                <Card.Title>Incoming Queries</Card.Title>
                <div style={{ overflow: 'scroll' }}>
                  {requests.map(renderRequest)}
                </div>
              </Card.Body>
            </ListGroup>
          </Col>
          <Col style={{ height: '100%' }} md={8}>
            <Tab.Content style={{ height: '100%' }}>
              {requests.map(renderDetail)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default App
