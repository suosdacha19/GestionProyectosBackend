const { db } = require('../../../../firebase')
module.exports = async (payload) => {
    let newsInvoices = []
    for (const [index,item] of Object.entries(payload)) {
        const result = await db.collection('Facturas').add({
            ...item
        })
        newsInvoices.push(result)
    }
    return newsInvoices
}