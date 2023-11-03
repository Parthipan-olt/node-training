const express = require('express');

const router = express.Router();
const controller = require('../api/controller/controller');

router.get('/', controller.renderIndexPage);
router.use('/submit', controller.renderListPage);
router.get('/view', controller.renderDetailsPage);
router.get('/edit', controller.renderEditPage);


module.exports = router;
