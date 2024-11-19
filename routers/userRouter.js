const express = require('express');
const router = express.Router();
const customError = require('../customError')
const { createAcount, login, updateUser} = require('../controllers/userController');

router.post('/create', createAcount);
router.post('/login',login);
router.put('/update',updateUser);

module.exports = router;