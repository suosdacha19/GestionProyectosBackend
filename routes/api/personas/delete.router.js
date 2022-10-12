const router = require('express').Router();
const controller = require('../../../src/personas/infrastructure/controllers/delete.controller')
module.exports = router.delete('/:id', controller)