const Cart = require('../models/cartModel')
const Product = require('../models/productModel');


const initializeCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId });
  }
  return cart;
};

const addProductToCart = async (userId, productId) => {
  const cart = await initializeCart(userId);
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  cart.products.push(productId);
  cart.total += product.price;
  await cart.save();
};

const removeFromChart = async (userId, productId) => {
  const cart = await initializeCart(userId);
  const productIndex = cart.products.indexOf(productId);
  if (productIndex === -1) {
    throw new Error('Product not found in cart');
  }
  cart.products.splice(productIndex, 1);
  cart.total -= product.price;
  await cart.save();
};

const verifyOrder = async (userId) => {
  const cart = await initializeCart(userId);
  if (cart.status === 'cart') {
    cart.status = 'verified';
    await cart.save();
    return true;
  } else {
    return false;
  }
};


const cancelOrder = async (userId) => {
  const cart = await initializeCart(userId);
  if (cart.status === 'cart') {
    cart.status = 'cancelled';
    await cart.save();
    return true;
  } else {
    return false;
  }
};

module.exports = {
  initializeCart,
  addProductToCart,
  removeFromChart,
  verifyOrder,
  cancelOrder
};