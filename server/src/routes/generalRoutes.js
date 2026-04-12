const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');

router.get('/categories', generalController.listCategories);
router.post('/categories', generalController.createCategory);
router.put('/categories/:id', generalController.updateCategory);
router.delete('/categories/:id', generalController.deleteCategory);
router.post('/categories/:id/entries', generalController.addEntry);
router.get('/entries/:id', generalController.getEntry);
router.put('/entries/:id', generalController.updateEntry);
router.delete('/entries/:id', generalController.deleteEntry);

module.exports = router;
