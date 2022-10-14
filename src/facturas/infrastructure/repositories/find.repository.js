const { db } = require('../../../../firebase')
module.exports = async (id) => {
    const result = await db.collection('Facturas').doc(id).get()
    return {
        id: result.id,
        ...result.data()
    }
}