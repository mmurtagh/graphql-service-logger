import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
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
  dangerBackground: {
    backgroundColor: '#721C25'
  }
}


export function ExpandableDetail ({
  isDanger,
  id,
  body,
  ...props
}) {
  const [ isToggled, setIsToggled ] = useState(false) 

  return (
    <Accordion
      as={Card}
      bg={isDanger ? 'danger' : 'dark'}
      border={isDanger ? 'danger' : 'secondary'}
      {...props}
    >
      <Accordion.Toggle
        as={Card.Header}
        eventKey={`expandable-detail-${id}`}
        onClick={() => setIsToggled(!isToggled)}
      >
        <Container>
          <Row >
            <Col style={{ textAlign: 'left' }}>{id}</Col>
            <Col style={{ textAlign: 'right' }}>
              {`${isToggled ? '▼' : '▶'}`}
            </Col>
          </Row>
        </Container>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={`expandable-detail-${id}`}>
        <Row noGutters style={styles.queryContainer}>
          <Col md="11">
            <pre
              style={{
                ...styles.queryText,
                ...(isDanger ? styles.dangerBackground : {})
              }}
            >
              {body}
            </pre>
          </Col>
          <Col md="1">
            <Button
              onClick={() => navigator.clipboard.writeText(body)}
              style={{ width: '100%' }}
              variant="secondary"
            >
              {content.copyButton}
            </Button>
          </Col>
        </Row>
      </Accordion.Collapse>
    </Accordion>
  )
}

