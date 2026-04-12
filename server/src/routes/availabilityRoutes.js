const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

router.get('/', availabilityController.list);
router.post('/', availabilityController.upsert);
router.delete('/:date', availabilityController.remove);

module.exports = router;
