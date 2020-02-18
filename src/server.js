import { Request } from './request'
import express, { request } from 'express'

export function startServer (port = 5000) {
  const app = express()

  app.use(express.json())
  app.use(express.static(`${__dirname}/../client/build`));

  app.get('/log/service-request', (req, res) => {
    const requests = Request.getRequests()
      .map((request) => request.json)
      .filter(({ isComplete, isIntrospectionQuery }) => isComplete && !isIntrospectionQuery)
      .sort((req1, req2) => req2.timeStamp - req1.timeStamp)
    res.json(requests)
  })

  app.delete('/log/service-request', (req, res) => {
    Request.nukeRequests()
    res.status(200).send()
  })

  app.get('/')

  app.listen(port, () => console.log(`🌳 Service logger ready on port ${port}`))
}

