const { db, admin } = require('../../../../firebase')

module.exports = async (payload) => {
    let newsInvoices = []
    payload = payload.map((invoice) => {
        const date = Date.parse(invoice.fecha) / 1000;
        invoice.fecha = new admin.firestore.Timestamp(date, 0);
        invoice.numeroFactura = parseInt(invoice.numeroFactura);
        invoice.precio = parseInt(invoice.precio);
        invoice.cantidad = parseInt(invoice.cantidad);
        invoice.tipo = parseInt(invoice.tipo);
        return invoice
    })
    for (const [index,item] of Object.entries(payload)) {
        const result = await db.collection('Facturas').add({
            ...item
        })
        newsInvoices.push(result)
    }
    return newsInvoices
}



