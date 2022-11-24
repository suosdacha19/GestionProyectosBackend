const { db, admin} = require('../../../../firebase')

const dayjs = require('dayjs')
const _ = require('lodash')

module.exports = async (anio) => {
    const arrayResult = []
    const arrayLabels = []
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

    result = _.groupBy(result, factura => factura.idProducto);

    for (const [index, item] of Object.entries(result)) {
        result[index] = _.groupBy(item, factura => factura.mes);
        for (let i = 1; i <= 12; i++) {
            let sumaTemp = 0
            if (result[index][i.toString()]) {
                result[index][i.toString()].map((e) => {
                    if (e.tipo === 2) sumaTemp += e.cantidad
                })
                result[index][i] = sumaTemp
            } else {
                result[index][i] = 0
            }
            sumaTemp = 0
        }
        arrayLabels.push(index)
        let promedio = 0
        for (const a of Object.values(result[index])) {
            promedio += a
        }
        arrayResult.push(Math.trunc(promedio / 12))
        promedio = 0
    }

    // return result
    return {
        arrayLabels,
        arrayResult
    }
}