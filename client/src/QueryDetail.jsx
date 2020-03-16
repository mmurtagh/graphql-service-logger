import React from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import ReactJson from 'react-json-view'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { content } from './constants'
import { ExpandableDetail } from './ExpandableDetail'


export function QueryDetail (request) {
  const { id, query, variables = {}, headers = {} } = request

  return (
  <Container>
    <Row>
      <Col md="12">
        <ExpandableDetail
           isDanger={false}
           id={content.queryHeader}
           body={query}
        />
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
