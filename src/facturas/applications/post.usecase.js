const repository = require('../infrastructure/repositories/post.repository')
module.exports = async (payload) => {
    return repository(payload)
}