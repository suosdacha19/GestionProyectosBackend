const repository = require('../../personas/infrastructure/repositories/find.repository')
module.exports = async (id) => {
    return repository(id)
}