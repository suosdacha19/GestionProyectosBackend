const router = require('express').Router();
const controller = require('../../../src/personas/infrastructure/controllers/put.controller')
module.exports = router.put('/:id', controller)