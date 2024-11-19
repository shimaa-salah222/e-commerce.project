const express = require('express');
const router = express.Router();
const customError = require('../customError');

const { getUsers , deleteUser } = require('../controllers/adminController');

const {authorized, adminAuthorized} = require('../middleware')



router.get('/getAll',authorized,adminAuthorized, getUsers);
router.delete('/delete',authorized , adminAuthorized, deleteUser);


module.exports = router;