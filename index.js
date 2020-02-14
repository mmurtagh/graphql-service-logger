const { loggerPlugin } = require('./lib/plugin/plugin')
const { Request } = require('./lib/plugin/request')

module.exports = {
  plugin: loggerPlugin,
  logServiceCall: (serviceCall, { requestId }) => {
    Request.associateServiceCall(requestId, serviceCall)
  }
}