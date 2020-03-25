const { loggerPlugin } = require('./lib/plugin')
const { Request } = require('./lib/request')

module.exports = {
  plugin: loggerPlugin,
  logServiceCall: (serviceCall = {}, context) => {
    const { url = ''  } = serviceCall 
    const { requestId } = context

    if (!context) {
      console.log(`graphql-service-logger received empty context for the following service call: ${url}`)
      return
    }
    if (!requestId) {
      console.log(`graphql-service-logger received empty requestId for the following service call: ${url}`)
      return
    }

    Request.associateServiceCall(requestId, serviceCall)
  }
}
