import { ServiceCall } from "./serviceCall"

export class Request {
  static requests = {}

  static getRequest (id) {
    return Request.requests[id]
  }

  static createRequest (id, timeStamp) {
    const request = new Request(id, timeStamp)
    Request.requests[id] = request
  }

  static associateServiceCall (id, serviceCall) {
    Request.getRequest(id)?.addServiceCall(new ServiceCall(serviceCall))
  }

  static delete (id) {
    delete Request.requests[id]
  }

  _serviceCalls = []
  _error = null
  _isComplete = false
  _isIntrospectionQuery = false


  constructor (id, timeStamp) {
    this._id = id
    this._timeStamp = timeStamp
  }

  set name (name) {
    this._name = name
  }

  set query(query) {
    this._query = query
  }

  set variables(variables) {
    this._variables = variables
  }

  set error(error) {
    this._error = error
  }

  get isIntrospectionQuery() {
    return this._isIntrospectionQuery
  }

  set isIntrospectionQuery (isIntrospectionQuery) {
    this._isIntrospectionQuery = isIntrospectionQuery
  }

  set headers(headers) {
    this._headers = headers
  }

  addServiceCall (serviceCall) {
    this. _serviceCalls.push(serviceCall)
  }

  get json () {
    const {
      _headers,
      _id,
      _error,
      _isIntrospectionQuery,
      _name,
      _query,
      _serviceCalls,
      _timeStamp,
      _variables,
    } = this

    return {
      headers: _headers,
      id: _id,
      error: _error,
      isIntrospectionQuery: _isIntrospectionQuery,
      name: _name,
      query: _query,
      serviceCalls: _serviceCalls.map((serviceCall) => serviceCall.json),
      timeStamp: _timeStamp,
      variables: _variables,
    }
  }
}
