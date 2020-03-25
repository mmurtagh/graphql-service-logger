import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import JumboTron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import io from 'socket.io-client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { ServiceCall } from './ServiceCall'
import { QueryDetail } from './QueryDetail'
import { generatePostman } from './postman'
import { content, spacing } from './constants'
import { ExpandableDetail } from './ExpandableDetail'
import testData from './testdata.json'


const styles = {
  maxHeight: { height: '100%' },
  incomingQueriesHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing,
  },
  incomingQueriesCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  contentRow: { justifyContent: 'center', height: '60vh' },
}

export function App(props) {
  const [ requests, setRequests ] = useState([] )

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setRequests(testData)
      return
    }

    const socket = io.connect('http://localhost:5000')    
    socket.on('request',(request) => {
      setRequests((prevRequests) => [ request, ...prevRequests ]) 
    })
  }, [])

  const renderRequest = (
    {
      id,
      name,
      timeStamp,
      error,
    },
    index
  ) => {    
    return (
      <ListGroup.Item
        action
        eventKey={id}
        variant={!error ? "dark" : "danger"}
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
    const { id, serviceCalls, error } = request

    console.log(!!error)
    return (
      <Tab.Pane style={styles.maxHeight} eventKey={id}>
        <Card style={{ ...styles.maxHeight, overflow: 'auto' }} bg="dark" text="white">
          <Card.Body>
            <Card.Title>{content.queryDetails}</Card.Title>
            {!!error  &&
            <Container>
              <ExpandableDetail
                isDanger
                id='Error'
                body={JSON.stringify(error, null, 4)}
                style={{ marginBottom: spacing }}
              />
            </Container>
            }
            <QueryDetail {...request} />
            <Container>
              <Card.Title style={{ paddingTop: spacing }}>{content.serviceCalls}</Card.Title>
              <Button
                style={{ marginBottom: spacing }}
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(generatePostman(request))}
              >
                {content.copyPostman}
              </Button>
            </Container>
            <Container>
              {serviceCalls.map((serviceCall) => {
                return (
                  <>
                    <ServiceCall {...serviceCall} />
                    <br />
                  </>
                )
              })}
            </Container>
          </Card.Body>
        </Card>
      </Tab.Pane>
    )
  }

  const onDeleteAll = () => {
    setRequests([])
  }

  return (
    <div style={{ margin: spacing }}>
      <JumboTron as={Card} bg="dark" text="white">
        <h1 style={{ alignSelf: 'center' }}>{content.title}</h1>
      </JumboTron>
      <Tab.Container>
        <Row style={styles.contentRow}>
          <Col className="test" style={styles.maxHeight} md={4}>
            <ListGroup
              as={Card}
              bg="dark"
              text="white"
              style={styles.maxHeight}
            >
              <Card.Body style={styles.incomingQueriesCard}>
                <div style={styles.incomingQueriesHeader}>
                  <Card.Title>{content.incomingQueries}</Card.Title>
                  <Button onClick={onDeleteAll} variant="danger">{content.deleteButton}</Button>
                </div>
                <div style={{ overflow: 'auto' }}>
                  {requests.map(renderRequest)}
                </div>
              </Card.Body>
            </ListGroup>
          </Col>
          <Col style={styles.maxHeight} md={8}>
            <Tab.Content style={styles.maxHeight}>
              {requests.map(renderDetail)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default App
