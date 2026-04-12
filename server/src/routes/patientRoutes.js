const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const previousNotesController = require('../controllers/previousNotesController');

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

// Previous notes endpoints
router.get('/:patientId/previous-notes', previousNotesController.list);
router.post('/:patientId/previous-notes', previousNotesController.create);
router.delete('/:patientId/previous-notes/:noteId', previousNotesController.remove);

module.exports = router;
