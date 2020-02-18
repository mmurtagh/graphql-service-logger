import React from 'react'
import Table from 'react-bootstrap/Table'
import ReactJson from 'react-json-view'
import Container from 'react-bootstrap/Container'

export function ServiceCall ({ url, method, headers, body }) {
    return (
        <Table size="sm" hover variant="dark">
            <tbody>
                <tr>
                    <td style={{ width: 100 }}>URL</td>
                    <td>{url}</td>
                </tr>
                <tr>
                    <td>Method</td>
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
                {body && (
                    <tr>
                        <td>Body</td>
                        <td>
                            {body}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}