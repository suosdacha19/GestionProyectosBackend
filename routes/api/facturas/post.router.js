const router = require('express').Router();
const controller = require('../../../src/facturas/infrastructure/controllers/post.controller')
module.exports = router.post('/', controller)