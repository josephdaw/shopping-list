const router = require('express').Router();
const {
  getAllItems,
  getOneItem,
  updateItem,
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


module.exports = router;
