const { db, admin} = require('../../../../firebase')
const dayjs = require('dayjs')
const _ = require('lodash')

module.exports = async (anio) => {
    const arrayResult = []
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
        const mes = dayjs(factura.fecha._seconds * 1000).month() + 1
        factura.fecha = dayjs(factura.fecha._seconds * 1000).format('DD-MM-YYYY')
        return {
            ...factura,
            mes
        }
    })

    result = _.groupBy(result, factura => factura.mes);

    for (const [index, item] of Object.entries(result)) {
        let compras = 0
        let ventas = 0
        item.map(factura => {
            if (factura.tipo === 1) {
                ventas += factura.precio * factura.cantidad
            } else if (factura.tipo === 2) {
                compras += factura.precio * factura.cantidad
            }
        })
        result[index] = ventas ? Math.trunc(((ventas - compras) / ventas) * 100) : 0
        // result[index] = {
        //     ventas,
        //     compras,
        // }
    }

    for (let i = 1; i <= 12; i++) {
        if (typeof result[i] === 'undefined') {
            arrayResult.push(0)
        } else {
            arrayResult.push(result[i] > 0 ? result[i] : 0)
        }
    }

    return arrayResult
}