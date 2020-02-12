import express, { request } from 'express'

class Logger {

    static port = 5000
    static serviceRequestTypeMap = {
        id: 'string',
        query: 'string',
        url: 'string',
        headers: 'object',
        tags: 'object'
    }

    requests = []

    startServer () {
        const app = express()

        app.use(express.json())
        app.use(express.static(`${__dirname}/../client/build`));

        app.post('/log', this.handlePostServiceCall)
        app.post('/log/service-request', this.handlePostServiceCall)
        app.get('/log/service-request', (req,res) => res.json(this.requests))

        app.listen(Logger.port, () => console.log('Listening'))
    }

    handlePostServiceCall = (req, res) => {
        console.log(typeof [])
        const { body: { request = {} } = {} } = req

        const isValid = Object.keys(Logger.serviceRequestTypeMap).every((key) => {
            return typeof request[key] === Logger.serviceRequestTypeMap[key]
        })

        if (!isValid) {
            res.sendStatus(400)
            return
        }

        this.requests.push(request)

        res.sendStatus(200)
    }

    handleGetServiceCall = (req, res) => {
        res.json(this.requests)
    }
}

let logger = new Logger()

export default {
    startServer: () => logger.startServer()
}