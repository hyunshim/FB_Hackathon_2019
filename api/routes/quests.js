const express = require('express');
const router = express.Router();
const mongo = require('mongoose');
const Quest = require('../models/quest');

const QuestsController = require('../controllers/quests');

router.post('/', QuestsController.create_quest);
router.get('/:questId', QuestsController.get_quest);
router.get('/', QuestsController.get_all_quests);
router.delete('/:questId', QuestsController.delete_quest);
router.patch('/:questId', QuestsController.update_quest)

module.exports = router;
