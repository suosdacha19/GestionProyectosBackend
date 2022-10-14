const repository = require('../infrastructure/repositories/find.repository')
module.exports = async (id) => {
    return repository(id)
}