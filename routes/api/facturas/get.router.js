const router = require('express').Router();
const controller = require('../../../src/facturas/infrastructure/controllers/get.controller')
module.exports = router.get('/', controller)