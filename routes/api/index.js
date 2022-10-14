const router = require('express').Router();
router.use('/personas', require('./personas'));
router.use('/facturas', require('./facturas'));
module.exports = router;