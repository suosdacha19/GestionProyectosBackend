const router = require('express').Router();
const controller = require('../../../src/personas/infrastructure/controllers/post.controller')
module.exports = router.post('/', controller)