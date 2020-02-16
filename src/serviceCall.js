export class ServiceCall {
  constructor ({ url, method = 'GET', headers, body }) {
    this.url = url
    this.method = method
    this.headers = headers
    this.body = body
  }

  get json() {
    const { url, method, headers, body } = this
    return { url, method, headers, body }
  }
}