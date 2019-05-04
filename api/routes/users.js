const express = require('express');
const router = express.Router();
const mongo = require('mongoose');
const User = require('../models/user');

const UsersController = require('../controllers/users');

router.post('/', UsersController.create_user);
router.get('/:userId', UsersController.get_user);
router.get('/', UsersController.get_all_users);
router.delete('/:userId', UsersController.delete_user);
router.post('/updateUser:userId', UsersController.update_user);

module.exports = router;
