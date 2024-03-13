const router = require('express').Router();
const { Store } = require('../../../models');

// The `/stores` endpoint

// get all stores
router.get('/', async (req, res) => {

  try {
    const storeData = await Store.find();
    res.status(200).json(storeData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
