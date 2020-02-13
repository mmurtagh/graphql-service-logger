import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import ReactJson from 'react-json-view'
import Container from 'react-bootstrap/Container'

export function ServiceCall ({ uri, method, headers }) {
    return (
        <Container>
            <Row>
                <Col>
                    <Table small striped size="sm" bordered hover variant="dark">
                        <tbody>
                            <tr style={{ width: 50 }}>
                                <td>URL</td>
                                <td>{uri}</td>
                            </tr>
                            <tr>
                                <td style={{ width: 50 }}>Method</td>
                                <td>{method}</td>
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