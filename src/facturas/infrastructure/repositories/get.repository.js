const { db } = require('../../../../firebase')
module.exports = async () => {
    const result = await db.collection('Facturas').get()
    return result.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}