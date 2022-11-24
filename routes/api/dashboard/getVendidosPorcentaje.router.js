const router = require('express').Router();
const controller = require('../../../src/dashboard/infrastructure/controllers/getVendidosPorcentaje.controller')
module.exports = router.get('/get-vendidos-porcentaje/:anio', controller)