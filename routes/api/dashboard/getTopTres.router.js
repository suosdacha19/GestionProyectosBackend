const router = require('express').Router();
const controller = require('../../../src/dashboard/infrastructure/controllers/getTopTres.controller')
module.exports = router.get('/get-top-tres/:anio', controller)