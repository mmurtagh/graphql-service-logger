import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import ReactJson from 'react-json-view'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { content, spacing } from './constants'

const styles = {
    queryContainer: {
        width: '100%',
        overflow: 'auto',
        padding: spacing,
    },
    queryText: {
        backgroundColor: '#1e1e1e',
        flex: 1,
        padding: spacing,
        marginRight: spacing,
        color: 'white'
    },
}


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
                                <Col style={{ textAlign: 'left' }}>{content.queryHeader}</Col>
                                <Col style={{ textAlign: 'right' }}>
                                    {`${isToggled ? '▼' : '▶'}`}
                                </Col>
                            </Row>
                        </Container>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`query-accordion-${id}`}>
                        <Row noGutters style={styles.queryContainer}>
                            <Col md="11">
                                <pre style={styles.queryText}>{query}</pre>
                            </Col>
                            <Col md="1">
                                <Button
                                    onClick={() => navigator.clipboard.writeText(query)}
                                    style={{ width: '100%' }}
                                    variant="secondary"
                                >
                                    {content.copyButton}
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
                        <td style={{ width: 100 }}>{content.requestIdHeader}</td>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <td>{content.variablesHeader}</td>
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
                        <td>{content.headersHeader}</td>
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
