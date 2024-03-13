const router = require('express').Router();
const { Item } = require('../../models');
const { Store } = require('../../models');

// The `/items` endpoint

// get all items
router.get('/', async (req, res) => {
  let query = {};

  if (req.query.storeId) {
    query['location.storeId'] = req.query.storeId;
  }

  // if (req.query.storeName && req.query.storeLocation) {
  //   query['location.storeName'] = req.query.storeName;
  //   query['location.storeLocation'] = req.query.storeLocation;
  // }

  try {
  const itemsData = await Item.find(query).populate('locations.storeId');
    // const itemsData = await Item.findById(req.params.id).populate('location.storeId')
    res.status(200).json(itemsData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// get one item
router.get('/:id', async (req, res) => {
  try {
    const itemData = await Item.findById(req.params.id).populate('locations.storeId');
    if (!itemData) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
