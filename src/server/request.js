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

    constructor (id, timeStamp) {
        this.id = id
        this.timeStamp = timeStamp
    }

    set query (query) {
        this._query = query
    }

    get query () {
        return this._query
    }

    addServiceCall (serviceCall) {
        this.serviceCalls.push(serviceCall)
    }

    get json () {
        const { id, _query, timeStamp, serviceCalls } = this

        return {
            id,
            query: _query,
            timeStamp,
            serviceCalls: serviceCalls.map((serviceCall) => serviceCall.json)
        }
    }
}

