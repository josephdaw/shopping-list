const { Item } = require('../../../models');

// get all items
const getAllItems = async (req, res) => {
  let query = {};

  if (req.query.storeId) {
    query['location.storeId'] = req.query.storeId;
  }

  try {
    const itemsData = await Item.find(query).populate('locations.storeId');
    res.status(200).json(itemsData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// get one item
const getOneItem = async (req, res) => {
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
};

// add an item
const addItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json(err);
  }
};

// update an item
const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('locations.storeId');
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  getAllItems,
  getOneItem,
  addItem,
  updateItem,
  deleteItem,
};