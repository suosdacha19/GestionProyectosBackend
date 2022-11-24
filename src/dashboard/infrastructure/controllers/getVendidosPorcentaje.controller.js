const usecase = require('../../applications/getVendidosPorcentaje.usecase')
module.exports = (req, res, next) => {
    usecase(req.params.anio).then(result => {
        res.send(result)
    }).catch(err => {
        next(err)
    })
}