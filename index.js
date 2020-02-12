import { logger } from './src/server/logger'

logger.startServer()

logger.createRequest('1234', Date.now())

logger.addQuery('1234', 'cart')

logger.addServiceCall('1234', 'https://google.com', 'POST', { Accept: 'application/json' } )

logger.createRequest('5678', Date.now())

logger.addQuery('5678', 'cart')

logger.addServiceCall('5678', 'https://google.com', 'POST', { Accept: 'application/json' })
logger.addServiceCall('5678', 'https://google.com', 'GET', { Accept: 'application/json' })

logger.printRequests()