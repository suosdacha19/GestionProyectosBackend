const router = require('express').Router();
router.use('/personas', require('./personas'));
router.use('/facturas', require('./facturas'));
router.use('/dashboard', require('./dashboard'));
module.exports = router;