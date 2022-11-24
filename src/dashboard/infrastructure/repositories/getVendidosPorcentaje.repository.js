const { db, admin} = require('../../../../firebase')

const dayjs = require('dayjs')
const _ = require('lodash')
const e = require("express");

module.exports = async (anio) => {
    let porcentajeTotal = 0
    let labels = []
    let porcentajeIndividual = []
    const fechaInicio = Date.parse(dayjs(`${anio}-01-01`)) / 1000;
    const fechaFin = Date.parse(dayjs(`${anio}-12-31`)) / 1000;

    const colorAleatorio = () => {
        let simbolos, color;
        simbolos = "0123456789ABCDEF";
        color = "#";

        for(var i = 0; i < 6; i++){
            color = color + simbolos[Math.floor(Math.random() * 16)];
        }
        return color;
    }

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

    result = _.groupBy(result, factura => factura.tipo);
    delete result[2] // Eliminamos los productos que se compraron
    result = result[1] // Nos quedamos con los productos que se vendieron

    result.map(factura => {
        porcentajeTotal += factura.cantidad
    })

    result = _.groupBy(result, factura => factura.idProducto);

    for (const [index, item] of Object.entries(result)) {
        let cantidadTemp = 0
        labels.push(index)
        item.map(factura => {
            cantidadTemp += factura.cantidad
        })
        porcentajeIndividual.push(parseFloat(((cantidadTemp * 100) / porcentajeTotal).toFixed(2)))
        cantidadTemp = 0
    }

    return {
        labels,
        porcentajeIndividual,
    }
}