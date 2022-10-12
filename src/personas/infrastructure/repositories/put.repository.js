const { db } = require('../../../../firebase')
module.exports = async (id, payload) => {
    return db.collection('Personas').doc(id).update(payload)
}