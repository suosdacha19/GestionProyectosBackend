const router = require('express').Router();
const controller = require('../../../src/facturas/infrastructure/controllers/delete.controller')
module.exports = router.delete('/:id', controller)