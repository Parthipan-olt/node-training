const express = require('express');

const router = express.Router();
const controller = require('../api/controller/controller');

router.get('/', controller.renderIndexPage);

router.get('/list', controller.renderListPage);
router.post('/list', controller.postFormData);
router.get('/delete-row', controller.deleteRecord);
router.get('/edit', controller.renderEditPage);
router.post('/edit-movie-details',controller.updateRecord);
router.get('/view',controller.viewDetails);
router.post('/add-review',controller.addReview)
router.get('/delete-review',controller.deleteReview);
module.exports = router;