function createRequest (request = {}) {
    if (typeof request !== 'object') {
        throw _createError()
    }

    const requiredKeys = [
        'id',
        'startTime',
        'completeTime',
        'name',
        'tags'
    ]

    const isObjectValid = requiredKeys.every((key) => {
        if (!Object.keys(request).includes(key)) return false

        let isKeyValid = true
        switch (key) {
            case 'id':
                isKeyValid = typeof request['id'] === 'string'
                break
            case 'startTime':
                isKeyValid = typeof request['startTime'] === 'number'
                break
            case 'name':
                isKeyValid = typeof request['name'] === 'string'
                break
            case 'tags':
                const tags = request['tags']

                if (typeof tags === 'undefined') {
                    isKeyValid = true
                    break
                }
                if (typeof tags !== 'array') {
                    isKeyValid = false
                    break
                }
                isKeyValid = tags.every((tag) => typeof tag === 'string')
                break
        }
    })

    if (!isObjectValid) throw _createError()

    const {
        id,
        startTime,
        completeTime,
        name,
        tags = []
    } = request

    return {
        id,
        startTime: new Date(startTime),
        endTime: new Date(completeTime),
        name,
        tags,
    }
}

function _createError (message = 'Invalid Request') {
    return new Error(message)
}

function validateRequest () {

}
