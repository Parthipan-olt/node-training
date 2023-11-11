const express = require('express');

const router = express.Router();
const controller = require('../api/controller/controller');

router.get('/', controller.renderIndexPage);
router.get('/list', controller.renderList);
router.post('/list', controller.postFormData);

module.exports = router;
