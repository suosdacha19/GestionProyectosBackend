const { db } = require('../../../../firebase')
module.exports = async (payload) => {
    let newsPersons = []
    for (const [index,item] of Object.entries(payload)) {
        const result = await db.collection('Personas').add({
            ...item
        })
        newsPersons.push(result)
    }
    return newsPersons
}