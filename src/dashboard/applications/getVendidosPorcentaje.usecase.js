const repository = require('../infrastructure/repositories/getVendidosPorcentaje.repository')
module.exports = async (anio) => {
    return repository(anio)
}