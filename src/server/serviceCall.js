export class ServiceCall {
  constructor ({ uri, method, headers }) {
    this.uri = uri
    this.method = method
    this.headers = headers
  }

  get json() {
    const { uri, method, headers } = this
    return { uri, method, headers }
  }
}