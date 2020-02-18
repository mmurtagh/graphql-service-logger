export function generatePostman (request) {
  const { serviceCalls = [] } = request
  console.log(serviceCalls)

  const postmanRequest = {
    collection: {
      info: {
        name: `${request.name} - ID: ${request.id}`,
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      },
      item: serviceCalls.map(generateItem),
    },
  }

  console.log(JSON.stringify(postmanRequest))

  return JSON.stringify(postmanRequest)
}

function generateItem ({
  url,
  method,
  headers,
  body,
}) {
  const header = Object.keys(headers).map((key) => ({ key, value: headers[key] }))

  const request = {
    url,
    method,
    header,
  }

  if (body) {
    request.body = {
      mode: 'raw',
      raw: body,
    }
  }

  return { request }
}