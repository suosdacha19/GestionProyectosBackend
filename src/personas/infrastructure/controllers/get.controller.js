const usecase = require('../../applications/get.usecase')
module.exports = (req, res, next) => {
    usecase().then(result => {
        res.send(result)
    }).catch(err => {
        next(err)
    })
}