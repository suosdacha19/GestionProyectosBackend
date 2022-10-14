const router = require('express').Router();
const controller = require('../../../src/facturas/infrastructure/controllers/put.controller')
module.exports = router.put('/:id', controller)