import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'

let io

export function startServer (port = 5000) {
  const app = express()
  app.use(express.static(`${__dirname}/../client/build`));

  const server = http.Server(app)
  io = SocketIO(server)
  
  server.listen(port)
}

export function sendRequest (request) {
  io.emit('request', request.json)
}

