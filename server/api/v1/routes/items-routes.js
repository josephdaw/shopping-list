const router = require('express').Router();
const {
  getAllItems,
  getOneItem,
  updateItem,
  deleteItem,
} = require('../controllers/items-controller');

// The `/items` endpoint
// get all items
router.get('/', async (req, res) => {
  getAllItems(req, res);
});

// get one item
router.get('/:id', async (req, res) => {
  getOneItem(req, res);
});

router.put('/:id', async (req, res) => {
  updateItem(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteItem(req, res);
});


module.exports = router;
