const User = require('../../../models/User');

// get all users
const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find().select('-password');
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
}

// get one user
const getOneUser = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id).select('-password');
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// update a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.status(200).json(updatedUser);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

// delete a user
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// authenticate a user
const authenticateUser = async (req, res) => {
  console.log('authenticating user...')
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await userData.isCorrectPassword(req.body.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    res.status(200).json({ ...userData._doc, password: undefined });
  }
  catch (err) {
    res.status(500).json(err);
  }
}


module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  authenticateUser
};
