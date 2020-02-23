import React from 'react'
import Table from 'react-bootstrap/Table'
import ReactJson from 'react-json-view'

import { content } from './constants'


export function ServiceCall ({ url, method, headers, body }) {
    return (
        <Table size="sm" hover variant="dark">
            <tbody>
                <tr>
                    <td style={{ width: 100 }}>{content.urlHeader}</td>
                    <td>{url}</td>
                </tr>
                <tr>
                    <td>{content.methodHeader}</td>
                    <td>{method}</td>
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
                {body && (
                    <tr>
                        <td>{content.bodyHeader}</td>
                        <td>{body}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}