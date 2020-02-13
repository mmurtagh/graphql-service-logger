import { createRequest, getRequest, getRequests } from './request'
import { ServiceCall } from './serviceCall'

class Logger {

    static port = 5000

    createRequest (id, timeStamp) {
        createRequest(id, timeStamp)
    }

    addQuery (id, query) {
        getRequest(id).query = query
    }

    addServiceCall (id, uri, method, headers) {
        const serviceCall = new ServiceCall({ uri, method, headers })

        getRequest(id).addServiceCall(serviceCall)
    }

    printRequests () {
        const requestList = getRequests()

        console.log(JSON.stringify(requestList))
    }
}

let loggerSingleton = null

export const logger = {
    get current() {
        if (loggerSingleton === null) {
            loggerSingleton = new Logger()
        }

        return loggerSingleton
    },
    createRequest: (id, timeStamp) => logger.current.createRequest(id, timeStamp),
    addQuery: (id, query) => logger.current.addQuery(id, query),
    addServiceCall: (id, uri, method, headers) => logger.current.addServiceCall(id, uri, method, headers),
    printRequests: () => logger.current.printRequests()
}