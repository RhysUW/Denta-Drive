const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/', templateController.list);
router.get('/:id', templateController.get);
router.post('/', templateController.create);
router.put('/:id', templateController.update);
router.delete('/:id', templateController.remove);

module.exports = router;