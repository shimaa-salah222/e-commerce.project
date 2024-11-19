const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total: { type: Number, default: 0 },
    status: { type: String, enum: ['cart', 'verified', 'cancelled'], default: 'cart' },
    createdAt: { type: Date, default: Date.now }
  });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;