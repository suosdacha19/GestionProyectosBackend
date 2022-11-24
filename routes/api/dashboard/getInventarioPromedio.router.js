const router = require('express').Router();
const controller = require('../../../src/dashboard/infrastructure/controllers/getInventarioPromedio.controller')
module.exports = router.get('/get-inventario-promedio/:anio', controller)