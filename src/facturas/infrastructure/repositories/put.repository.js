const { db } = require('../../../../firebase')
module.exports = async (id, payload) => {
    return db.collection('Facturas').doc(id).update(payload)
}