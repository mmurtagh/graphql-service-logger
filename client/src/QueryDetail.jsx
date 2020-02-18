import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import ReactJson from 'react-json-view'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export function QueryDetail (request) {
    const { id, query, variables = {}, headers = {} } = request
    const [ isToggled, setIsToggled ] = useState(false)

    return (
    <Container>
        <Row>
            <Col md="12">
                <Accordion as={Card} bg="dark" border="secondary">
                    <Accordion.Toggle
                        as={Card.Header}
                        eventKey={`query-accordion-${id}`}
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
                    <Accordion.Collapse eventKey={`query-accordion-${id}`}>
                        <Row
                            noGutters
                            style={{
                                width: '100%',
                                overflow: 'scroll',
                                padding: 16,
                            }}>
                            <Col md="11">
                                <pre
                                    style={{
                                        backgroundColor: '#1e1e1e',
                                        flex: 1,
                                        padding: 16,
                                        marginRight: 16,
                                        color: 'white'
                                    }}>
                                        {query}
                                </pre>
                            </Col>
                            <Col md="1">
                                <Button
                                    onClick={() => navigator.clipboard.writeText(query)}
                                    style={{ width: '100%' }}
                                    variant="secondary">
                                        Copy
                                </Button>
                            </Col>
                        </Row>
                    </Accordion.Collapse>
                </Accordion>
            </Col>
            <Col md="12" style={{ height: '100%' }}>
            <Table size="sm" hover variant="dark">
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
                    <tr>
                        <td>Headers</td>
                        <td>
                            <ReactJson
                                collapsed={true}
                                displayDataTypes={false}
                                name={false}
                                src={headers}
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
