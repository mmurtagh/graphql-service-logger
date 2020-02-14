import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import moment from 'moment'
import fetch from 'node-fetch'

import { ServiceCall } from './ServiceCall'


export function App(props) {
  const [ requests, setRequests ] = useState([])
  useEffect(() => {
    poll()
  }, [])

  const renderRequest = (
    {
      id,
      name,
      timeStamp,
    },
    index
  ) => {
    return (
      <ListGroup.Item
        action
        eventKey={id}
        variant="dark"
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

  const renderDetail = ({ id, serviceCalls }) => {

    return (
      <Tab.Pane eventKey={id} style={{ padding: 16 }}>
        <Card bg="dark" text="white" >
          <Card.Body>
          <Card.Title>Service Calls</Card.Title>
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

        setTimeout(poll, 100)
      })
      .catch((e) => {
        setTimeout(poll, 2000)
      })
  }

  const onRequestPress = () => {
    const requestCopy = requests.slice()
    requestCopy.unshift({
      id: `Link ${requests.length}`,
      isDark: requests.length % 2 === 0,
      query: 'cart',
      timeStamp: Date.now(),
    })

    setRequests(requestCopy)
  }

  return (
      <Tab.Container id="list-group-tabs-example" >
        <Row
          style={{
            justifyContent: 'center',
          }}>
          <Col className="test" sm={3}>
            <div style={{ maxHeight: '60vh', overflow: 'scroll', padding: 16 }}>
              <ListGroup>
                {requests.map(renderRequest)}
              </ListGroup>
            </div>
          </Col>
          <Col sm={6}>
            <Tab.Content>
              {requests.map(renderDetail)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
  )
}

export default App