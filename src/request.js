import { ServiceCall } from "./serviceCall"

export class Request {
    static requests = {}

    static getRequest (id) {
        return Request.requests[id]
    }

    static getRequests (id) {
        return Object.keys(Request.requests).map((key) => Request.requests[key])
    }

    static createRequest (id, timeStamp) {
        const request = new Request(id, timeStamp)
        Request.requests[id] = request
    }

    static associateServiceCall (id, serviceCall) {
        Request.getRequest(id).addServiceCall(new ServiceCall(serviceCall))
    }

    _serviceCalls = []

    _isErrored = false
    _isComplete = false

    constructor (id, timeStamp) {
        this._id = id
        this._timeStamp = timeStamp
    }

    set name (name) {
        this._name = name
    }

    set query(query) {
        console.log(query)
        this._query = query
    }

    set variables(variables) {
        this._variables = variables
    }

    set isErrored (isErrored) {
        this._isErrored = isErrored
    }

    set isComplete (isComplete) {
        this._isComplete = isComplete
    }

    addServiceCall (serviceCall) {
        this. _serviceCalls.push(serviceCall)
    }

    get json () {
        const {
            _id,
            _name,
            _query,
            _variables,
            _isErrored,
            _isComplete,
            _timeStamp,
            _serviceCalls
        } = this

        return {
            id: _id,
            name: _name,
            query: _query,
            variables: _variables,
            isErrored: _isErrored,
            isComplete: _isComplete,
            timeStamp: _timeStamp,
            serviceCalls: _serviceCalls.map((serviceCall) => serviceCall.json)
        }
    }
}

