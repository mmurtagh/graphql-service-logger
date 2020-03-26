const { loggerPlugin } = require('./lib/plugin')
const { Request } = require('./lib/request')

module.exports = {
  plugin: loggerPlugin,
  logServiceCall: (serviceCall = {}, requestId) => {
    const { url = ''  } = serviceCall 

    if (!requestId) {
      console.warn(`graphql-service-logger received empty requestId for the following service call: ${url}`)
      return
    }

    Request.associateServiceCall(requestId, serviceCall)
  }
}
