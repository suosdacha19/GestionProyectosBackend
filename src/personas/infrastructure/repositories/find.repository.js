const { db } = require('../../../../firebase')
module.exports = async (id) => {
    const result = await db.collection('Personas').doc(id).get()
    return {
        id: result.id,
        ...result.data()
    }
}