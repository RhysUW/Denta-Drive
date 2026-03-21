const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.list);
router.post('/', patientController.create);
router.get('/:id', patientController.get);
router.put('/:id', patientController.update);
router.delete('/:id', patientController.remove);

// Image endpoints
router.post('/:id/images/upload-url', patientController.getUploadUrl);
router.post('/:id/images', patientController.recordImage);
router.get('/:id/images', patientController.listImages);
router.delete('/:id/images/:imageId', patientController.deleteImage);

module.exports = router;
