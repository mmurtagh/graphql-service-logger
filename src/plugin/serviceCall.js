export class ServiceCall {
  constructor ({ uri, method = 'GET', headers, body }) {
    this.uri = uri
    this.method = method
    this.headers = headers
    this.body = body
  }

  get json() {
    const { uri, method, headers, body } = this
    return { uri, method, headers, body }
  }
}