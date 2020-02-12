import express, { request } from 'express'
import { createRequest, getRequest, Request, requests } from './request'
import { ServiceCall } from './serviceCall'

class Logger {

    static port = 5000

    startServer () {
        const app = express()

        app.use(express.json())
        app.use(express.static(`${__dirname}/../client/build`));

        app.get('/log/service-request', (req,res) => res.json(this.requests))

        app.listen(Logger.port, () => console.log('Listening'))
    }

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
        const requestList = Object.keys(requests).map((key) => getRequest(key).json)

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
    startServer: () => logger.current.startServer(),
    createRequest: (id, timeStamp) => logger.current.createRequest(id, timeStamp),
    addQuery: (id, query) => logger.current.addQuery(id, query),
    addServiceCall: (id, uri, method, headers) => logger.current.addServiceCall(id, uri, method, headers),
    printRequests: () => logger.current.printRequests()
}