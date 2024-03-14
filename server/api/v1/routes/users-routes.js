const router = require('express').Router();
const { getAllUsers, getOneUser, updateUser, deleteUser, authenticateUser } = require('../controllers/users-controller');

// The `/users` endpoint

// get all users
router.get('/', async (req, res) => {
  getAllUsers(req, res);
});

// get one user
router.get('/:id', async (req, res) => {
  getOneUser(req, res);
});

// update a user
router.put('/:id', async (req, res) => {
  updateUser(req, res);
});

// delete a user
router.delete('/:id', async (req, res) => {
  deleteUser(req, res);
});

// authenticate a user
router.post('/auth', async (req, res) => {
  authenticateUser(req, res);
});


module.exports = router;
