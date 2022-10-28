const usecase = require('../../applications/findByUid.usecase')
module.exports = (req, res, next) => {
    usecase(req.params.uid).then(result => {
        res.send(result)
    }).catch(err => {
        next(err)
    })
}