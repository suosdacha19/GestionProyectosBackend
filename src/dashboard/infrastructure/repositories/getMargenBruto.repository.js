const { db, admin} = require('../../../../firebase')
const dayjs = require('dayjs')
const _ = require('lodash')

module.exports = async (anio) => {
    const fechaInicio = Date.parse(dayjs(`${anio}-01-01`)) / 1000;
    const fechaFin = Date.parse(dayjs(`${anio}-12-31`)) / 1000;
    let result = await db.collection('Facturas')
        .where("fecha",">", new admin.firestore.Timestamp(fechaInicio, 0))
        .where("fecha","<", new admin.firestore.Timestamp(fechaFin, 0))
        .get()
    result = result.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    result = result.map(factura => {
        factura.fecha = dayjs(factura.fecha._seconds * 1000).format('DD/MM/YYYY')
        return {
            ...factura
        }
    })

    return _.groupBy(result, factura => factura.tipo);
}