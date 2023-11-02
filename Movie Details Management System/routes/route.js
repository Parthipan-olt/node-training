const express = require('express');

const router = express.Router();
const controller = require('../api/controller/controller');

router.get('/', controller.renderIndexPage);

module.exports = router;
