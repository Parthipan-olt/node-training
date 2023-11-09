const express = require('express');

const router = express.Router();
const controller = require('../api/controller/controller');

router.get('/', controller.renderIndexPage);
router.post('/', controller.addNewMovie);

router.get('/list', controller.renderListPage);
// router.post('/list', controller.sendAllRecords);

module.exports = router;