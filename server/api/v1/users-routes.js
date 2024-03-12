const router = require('express').Router();
const { User } = require('../../models');

// The `/users` endpoint

// get all users
router.get('/', async (req, res) => {

  try {
    const userData = await User.find().select('-password');
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
