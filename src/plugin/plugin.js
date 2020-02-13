import { logger } from './logger'
import { startServer } from '../server'

export const loggerPlugin = {
  serverWillStart () {
    startServer()
  },
  requestDidStart(context) {
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

        // const request = logger.getRequest(requestId)
        // request.setName(names)
        // request.setQuery(query)
        // request.setVariables(variables)
      },
      willSendResponse(context) {
        // logger.getRequest(requestId).complete()
      },
      didEncounterErrors({ errors }) {
        // logger.getRequest(requestId).setErrored()
      },
    }
  },
}
