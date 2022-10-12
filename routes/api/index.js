const router = require('express').Router();
router.use('/personas', require('./personas'));
module.exports = router;