const { db } = require('../../../../firebase')
module.exports = async (id) => {
    return db.collection('Facturas').doc(id).delete()
}