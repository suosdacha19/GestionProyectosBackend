const router = require('express').Router();
const controller = require('../../../src/personas/infrastructure/controllers/find.controller')
module.exports = router.get('/:id', controller)