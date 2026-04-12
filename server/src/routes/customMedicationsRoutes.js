const express = require('express');
const router = express.Router();
const customMedicationsController = require('../controllers/customMedicationsController');

router.get('/', customMedicationsController.list);
router.post('/patch', customMedicationsController.upsertPatch);
router.post('/class', customMedicationsController.createNewClass);
router.delete('/:id', customMedicationsController.remove);

module.exports = router;
