import { getRequests } from '../plugin/request'
import express from 'express'

export function startServer (port = 5000) {
  const app = express()

  app.use(express.json())
  app.use(express.static(`${__dirname}/../../client/build`));

  app.get('/log/service-request', (req, res) => {
    res.json(getRequests().filter(({ isComplete }) => isComplete))
  })

  app.get('/')

  app.listen(port, () => console.log('Listening'))
}

