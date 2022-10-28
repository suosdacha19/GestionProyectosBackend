const router = require('express').Router();
const controller = require('../../../src/dashboard/infrastructure/controllers/getMargenBruto.controller')
module.exports = router.get('/get-margen-bruto/:anio', controller)