const router = require('express').Router();
const controller = require('../../../src/facturas/infrastructure/controllers/find.controller')
module.exports = router.get('/:id', controller)