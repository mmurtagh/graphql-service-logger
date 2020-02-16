import { Request } from './request'
import express, { request } from 'express'

export function startServer (port = 5000) {
  const app = express()
  console.log(`${__dirname}/../client/build`)

  app.use(express.json())
  app.use(express.static(`${__dirname}/../client/build`));

  app.get('/log/service-request', (req, res) => {
    res.json(Request.getRequests().map((request) => request.json))
  })

  app.get('/')

  app.listen(port, () => console.log('Listening'))
}

