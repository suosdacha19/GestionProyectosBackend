const usecase = require('../../applications/post.usecase')
module.exports = (req, res, next) => {
    usecase(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        next(err)
    })
}