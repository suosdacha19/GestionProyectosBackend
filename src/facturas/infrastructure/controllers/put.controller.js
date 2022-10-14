const usecase = require('../../applications/put.usecase')
module.exports = (req, res, next) => {
    usecase(req.params.id, req.body).then(result => {
        res.send(result)
    }).catch(err => {
        next(err)
    })
}