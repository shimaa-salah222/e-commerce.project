const express = require('express');
const router = express.Router();
const customError = require('../customError');
const {authorized} = require('../middleware')
const {initializeCart, addProductToCart, removeFromChart, verifyOrder, cancelOrder} = require('../controllers/cartController');


router.post('/initcart' ,authorized, initializeCart);
router.post('/addcart' ,authorized, addProductToCart);
router.delete('/deletecart',authorized, removeFromChart);
router.post('/verify', authorized, verifyOrder);
router.post('/cancel',authorized, cancelOrder);

module.exports = router;