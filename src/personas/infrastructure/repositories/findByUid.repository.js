const { db } = require('../../../../firebase')
module.exports = async (uid) => {
    const result = await db.collection('Personas').where('uid', '==', uid).get()
    return {
        id: result.id,
        ...result.docs[0].data()
    }
}