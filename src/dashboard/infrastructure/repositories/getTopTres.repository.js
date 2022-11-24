const { db, admin} = require('../../../../firebase')

const dayjs = require('dayjs')
const _ = require('lodash')
const e = require("express");

module.exports = async (anio) => {
    const arrayResult = []
    let tempTopTres = []
    let tempResult = {}
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

    delete result[1]
    result = result[2]

    const topTres = _.groupBy(result, factura => factura.idProducto);
    result = _.groupBy(result, factura => factura.idProducto);

    for (const [index, item] of Object.entries(topTres)) {
        let cantidadTemp = 0
        item.map(e => {
            cantidadTemp += e.cantidad
        })
        topTres[index] = cantidadTemp
        if (tempTopTres.length === 0) {
            tempTopTres.push({
                idProducto: index,
                cantidad: cantidadTemp
            })
            tempTopTres.push({
                    idProducto: null,
                    cantidad: 0
            })
            tempTopTres.push({
                idProducto: null,
                cantidad: 0
            })
        } else {
            if (topTres[index] > tempTopTres[0].cantidad) {
                tempTopTres[0] = {
                    idProducto: index,
                    cantidad: topTres[index]
                }
            } else if (topTres[index] > tempTopTres[1].cantidad) {
                tempTopTres[1] = {
                    idProducto: index,
                    cantidad: topTres[index]
                }
            } else if (topTres[index] > tempTopTres[2].cantidad) {
                tempTopTres[2] = {
                    idProducto: index,
                    cantidad: topTres[index]
                }
            }
        }
    }

    for (const key in tempTopTres) {
        tempResult[tempTopTres[key].idProducto] = result[tempTopTres[key].idProducto]
    }

    for (const [index, item] of Object.entries(tempResult)) {
        tempResult[index] = _.groupBy(item, factura => factura.mes);
        let arrayTemp = []
        for (let i = 1; i <= 12; i++) {
            let cantidadTemp = 0
            if (tempResult[index][i]) {
                tempResult[index][i].map(e => {
                    cantidadTemp += e.cantidad
                })
            }
            arrayTemp.push(cantidadTemp)
        }
        arrayResult.push({
            label: index,
            backgroundColor: colorAleatorio(),
            data: arrayTemp
        })
    }
    return arrayResult
}