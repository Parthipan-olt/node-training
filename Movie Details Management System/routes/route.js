const express = require('express');

const router = express.Router();
const controller = require('../api/controller/controller');

router.get('/', controller.renderIndexPage);
router.post('/add-new-movie', controller.addNewMovie);

router.use('/list', controller.renderList)
module.exports = router;