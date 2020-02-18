import { Request } from './request'
import { startServer } from './server'

export const loggerPlugin = {
  serverWillStart () {
    startServer()
  },
  requestDidStart({ context: { requestId } }) {
    Request.createRequest(requestId, Date.now())

    return {
      didResolveOperation({
        operation: {
          selectionSet: {
            selections = [],
          } = {},
        } = {},
        context: { requestId, requestHeaders },
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
      willSendResponse({ context: { requestId }}) {
        Request.getRequest(requestId).isComplete = true
      },
      didEncounterErrors() {
        Request.getRequest(requestId).isErrored = true
      },
    }
  },
}
