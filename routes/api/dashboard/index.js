const express = require('express');
const router = express.Router();
// const authorization = require('../../../middleware/authorization.middleware')
module.exports = router.use(
    '/',
    // authorization,
    [
        require('./getMargenBruto.router'),
        require('./getInventarioPromedio.router'),
        require('./getTopTres.router'),
        require('./getVendidosPorcentaje.router'),
    ]
);