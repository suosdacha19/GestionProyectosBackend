const repository = require('../../personas/infrastructure/repositories/post.repository')
module.exports = async (payload) => {
    return repository(payload)
}