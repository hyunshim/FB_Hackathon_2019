const express = require('express');
const router = express.Router();
const mongo = require('mongoose');
const User = require('../models/user');

const UsersController = require('../controllers/users');


module.exports = router;
