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
        context: { requestId },
        request: { query, variables },
      }) {
        const names = selections.map(({ name: { value } = {} }) => value)
        const name = names.join(' & ')

        const request = Request.getRequest(requestId)
        request.name = name
        request.query = query
        request.variables = variables
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
