const prodectModel = require('../models/productModel')


const createProduct = async (req, res) => {
  try {
    const products = new prodectModel(req.body);
    await products.save();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await prodectModel.find().exec();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

const getById= async (req, res) => {
  try {
    const product = await prodectModel.findById(req.params.id).exec();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await prodectModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating product' });
  }
};

const deleteProduct =  async (req, res) => {
  try {
    const product = await prodectModel.findByIdAndRemove(req.params.id).exec();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports={
    createProduct,
    getProduct,
    getById,
    updateProduct,
    deleteProduct

  }