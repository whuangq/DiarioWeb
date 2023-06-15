const express = require('express');
const router = express.Router();

router.get('/', commentController.index);
router.post('/', commentController.create);

module.exports = router;