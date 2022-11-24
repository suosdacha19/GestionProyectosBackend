const repository = require('../infrastructure/repositories/getInventarioPromedio.repository')
module.exports = async (anio) => {
    return repository(anio)
}