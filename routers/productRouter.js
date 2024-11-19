const express = require('express');
const router = express.Router();
const customError = require('../customError');
const { createProduct, getProduct , updateProduct, deleteProduct}= require('../controllers/productController');
const {authorized, adminAuthorized} = require('../middleware')


router.post('/createProduct',authorized,adminAuthorized, createProduct);
router.get('/getPro', getProduct);
router.put('/updatepro',authorized,adminAuthorized, updateProduct);
router.delete('/deletepro',authorized,adminAuthorized, deleteProduct);


module.exports = router