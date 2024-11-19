const usermodel = require('../models/usermodel')


const getUsers =  async (req, res) => {
    try {
      const users = await usermodel.find().exec();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving users' });
    }
  };

  const deleteUser =  async (req, res) => {
    try {
      const user = await usermodel.findByIdAndRemove(req.params.id).exec();
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };


  module.exports ={
    getUsers,
    deleteUser
  }
  