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
  const itemsData = await Item.find(query).populate('location.storeId');
    // const itemsData = await Item.findById(req.params.id).populate('location.storeId')
    res.status(200).json(itemsData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
