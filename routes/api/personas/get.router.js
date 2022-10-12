const router = require('express').Router();
const controller = require('../../../src/personas/infrastructure/controllers/get.controller')
module.exports = router.get('/', controller)