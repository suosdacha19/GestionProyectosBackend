const usecase = require('../../applications/find.usecase')
module.exports = (req, res, next) => {
    usecase(req.params.id).then(result => {
        res.send(result)
    }).catch(err => {
        next(err)
    })
}