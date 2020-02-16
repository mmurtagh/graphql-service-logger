const { loggerPlugin } = require('./lib/plugin')
const { Request } = require('./lib/request')

module.exports = {
  plugin: loggerPlugin,
  logServiceCall: (serviceCall, { requestId }) => {
    Request.associateServiceCall(requestId, serviceCall)
  }
}