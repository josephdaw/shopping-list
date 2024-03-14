const router = require('express').Router();
const {
  getAllItems,
  getOneItem,
  addItem,
  updateItem,
  deleteItem,
} = require('../controllers/items-controller');

// The `/items` endpoint
// get all items
router.get('/', async (req, res) => {
  getAllItems(req, res);
});

// add an item
router.post('/', async (req, res) => {
  addItem(req, res);
});

// get one item
router.get('/:id', async (req, res) => {
  getOneItem(req, res);
});

// update an item
router.put('/:id', async (req, res) => {
  updateItem(req, res);
});

// delete an item
router.delete('/:id', async (req, res) => {
  deleteItem(req, res);
});


module.exports = router;
