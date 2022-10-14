const repository = require('../infrastructure/repositories/delete.repository')
module.exports = async (id) => {
    return repository(id)
}