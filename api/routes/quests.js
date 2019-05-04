const express = require('express');
const router = express.Router();
const mongo = require('mongoose');
const Quest = require('../models/quest');

const QuestsController = require('../controllers/quests');

router.get('/quests', QuestsController.get_all_quests);
router.delete('/quest:questId', QuestsController.delete_mark);
router.post('/quest', QuestsController.create_quest);

module.exports = router;
