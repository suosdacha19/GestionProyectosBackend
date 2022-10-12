const repository = require('../../personas/infrastructure/repositories/put.repository')
module.exports = async (id, payload) => {
    return repository(id, payload)
}