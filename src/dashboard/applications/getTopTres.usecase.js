const repository = require('../infrastructure/repositories/getTopTres.repository')
module.exports = async (anio) => {
    return repository(anio)
}