const express = require('express');
const router = express.Router();
const mongo = require('mongoose');
const Mark = require('../models/mark');

const MarksController = require('../controllers/marks');

router.get('/', MarksController.get_all_marks);
router.get('/:markId', MarksController.get_mark);
router.delete('/:markId', MarksController.delete_mark);
router.post('/', MarksController.create_mark);

module.exports = router;
