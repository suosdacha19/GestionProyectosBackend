const repository = require('../../personas/infrastructure/repositories/get.repository')
module.exports = async () => {
    return repository()
}