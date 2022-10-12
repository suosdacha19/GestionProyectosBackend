const repository = require('../../personas/infrastructure/repositories/delete.repository')
module.exports = async (id) => {
    return repository(id)
}