export const requests = {}

export function getRequest (id) {
    return requests[id]
}

export function getRequests () {
    return Object.keys(requests).map((id) => requests[id].json)
}

export function createRequest (id, timeStamp) {
    requests[id] = new Request(id, timeStamp)
}

export class Request {
    serviceCalls = []

    _isErrored = false
    _isComplete = false

    constructor (id, timeStamp) {
        this.id = id
        this.timeStamp = timeStamp
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

    set isErrored (isErrored) {
        this._isErrored = isErrored
    }

    set isComplete (isComplete) {
        this_.isComplete = isComplete
    }

    addServiceCall (serviceCall) {
        this.serviceCalls.push(serviceCall)
    }

    get json () {
        const {
            id,
            _name,
            _query,
            _variables,
            _isErrored,
            _isComplete,
            timeStamp,
            serviceCalls
        } = this

        return {
            id,
            query: _query,
            variables: _variables,
            isErrored: _isErrored,
            isComplete: _isComplete,
            timeStamp,
            serviceCalls: serviceCalls.map((serviceCall) => serviceCall.json)
        }
    }
}

