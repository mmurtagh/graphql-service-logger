import { Request } from './request'
import { startServer, sendRequest } from './server'

export const loggerPlugin = {
  serverWillStart () {
    startServer()
  },
  requestDidStart({ context: { serviceLogger: { requestId } } }) {
    Request.createRequest(requestId, Date.now())

    return {
      didResolveOperation({
        operation: {
          selectionSet: {
            selections = [],
          } = {},
        } = {},
        context: { serviceLogger: { requestId }, requestHeaders },
        request: { query, variables },
      }) {
        const names = selections.map(({ name: { value } = {} }) => value)
        const name = names.join(' & ')

        const request = Request.getRequest(requestId)
        request.name = name
        request.query = query
        request.variables = variables
        request.headers = requestHeaders
        if (name === '__schema') {
          request.isIntrospectionQuery = true
        }
      },
      willSendResponse({ context: { serviceLogger: { requestId } }}) {
        const request = Request.getRequest(requestId)
        if (!request.isIntrospectionQuery) {
          sendRequest(request)
        } 
        Request.delete(request.id)
      },
      didEncounterErrors({ errors }) {
        const request = Request.getRequest(requestId)
        request.error = errors
      },
    }
  },
}
