import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import ReactJson from 'react-json-view'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import ListGroup from 'react-bootstrap/ListGroup'

export function QueryDetail ({ id, query, variables = {} }) {
    const [ isToggled, setIsToggled ] = useState(false)

    return (
    <Container>
        <Row>
            <Col md="6">
                <Accordion as={Card} bg="secondary" text="white" >
                    <Accordion.Toggle
                        as={Card.Header}
                        eventKey="0"
                        style={{ width: '100%' }}
                        onClick={() => setIsToggled(!isToggled)}
                    >
                        <Container>
                            <Row >
                                <Col style={{ textAlign: 'left' }}>
                                    Query
                                </Col>
                                <Col style={{ textAlign: 'right' }}>
                                    {`${isToggled ? '▼' : '▶'}`}
                                </Col>
                            </Row>
                        </Container>
                    </Accordion.Toggle>
                    <Accordion.Collapse style={{ width: '100%' }} eventKey="0">
                        <div
                            style={{
                                width: '100%',
                                overflow: 'scroll',
                                backgroundColor: '#1e1e1e',
                                padding: 16,
                            }}>
                            <pre style={{ color: 'white' }}>{query}</pre>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </Col>
            <Col md={6} style={{ height: '100%' }}>
            <Table hover size="sm" borderless variant="dark">
                <tbody>
                    <tr>
                        <td style={{ width: 100 }}>Request ID</td>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <td>Variables</td>
                        <td>
                            <ReactJson
                                collapsed={true}
                                displayDataTypes={false}
                                name={false}
                                src={variables}
                                theme="twilight"
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Col>
        </Row>
    </Container>
    )
}
