const repository = require('../infrastructure/repositories/getMargenBruto.repository')
module.exports = async (anio) => {
    return repository(anio)
}