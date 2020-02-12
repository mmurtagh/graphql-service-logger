import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import moment from 'moment'


export function App(props) {
  const [ requests, setRequests ] = useState([])

  const renderRequest = (
    {
      isDark,
      query,
      timeStamp,
    },
    index
  ) => {
    return (
      <ListGroup.Item
        action
        variant={isDark ? 'secondary' : 'light'}
      >
        <Container>
            <Row>
              <Col style={{ fontWeight: 'bold' }}>
                {query}
              </Col>
              <Col style={{ textAlign: 'right' }}>
                {moment(timeStamp).format('h:mm:ss a MM/DD')}
              </Col>
            </Row>
        </Container>
      </ListGroup.Item>
    )  
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
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey="#link1"
      >
          <Row
            style={{
              justifyContent: 'center',
            }}>
            <Col style={{ height: '60vh'}} className="test" sm={3}>
              <div style={{ maxHeight: '100%', overflow: 'scroll', padding: 16   }}>
                <ListGroup>
                  {requests.map(renderRequest)}
                </ListGroup>
              </div>
            </Col>
            <Col sm={6}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <div style={{ backgroundColor: 'red' }}>
                    <h1>Hello World</h1>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <h1>Test</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
          <Button onClick={onRequestPress} variant="primary">Primary</Button>
      </Tab.Container>
  )
}

export default App