import { Request } from '../plugin/request'
import express, { request } from 'express'

export function startServer (port = 5000) {
  const app = express()

  app.use(express.json())
  app.use(express.static(`${__dirname}/../../client/build`));

  app.get('/log/service-request', (req, res) => {
    res.json(Request.getRequests().map((request) => request.json))
  })

  app.get('/')

  app.listen(port, () => console.log('Listening'))
}

