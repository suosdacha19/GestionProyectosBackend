const { db } = require('../../../../firebase')
module.exports = async (id) => {
    return db.collection('Personas').doc(id).delete()
}