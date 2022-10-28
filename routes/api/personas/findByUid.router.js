const router = require('express').Router();
const controller = require('../../../src/personas/infrastructure/controllers/findByUid.controller')
module.exports = router.get('/get-by-uid/:uid', controller)