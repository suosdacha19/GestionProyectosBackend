const repository = require('../../personas/infrastructure/repositories/findByUid.repository')
module.exports = async (uid) => {
    return repository(uid)
}