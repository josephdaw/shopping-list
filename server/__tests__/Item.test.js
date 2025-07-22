const mongoose = require('mongoose');
const Item = require('../models/Item');

describe('Item Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopping-list-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await Item.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should create a new item with required fields', async () => {
    const itemData = {
      name: 'Milk',
      locations: [
        {
          storeId: new mongoose.Types.ObjectId(),
          locationDetails: 'Dairy section, aisle 3'
        }
      ]
    };

    const item = new Item(itemData);
    await item.save();

    expect(item.name).toBe('Milk');
    expect(item.locations).toHaveLength(1);
    expect(item.locations[0].locationDetails).toBe('Dairy section, aisle 3');
    expect(item.createdAt).toBeDefined();
    expect(item.updatedAt).toBeDefined();
  });

  test('should not create item without required name', async () => {
    const item = new Item({
      locations: [
        {
          storeId: new mongoose.Types.ObjectId(),
          locationDetails: 'Some location'
        }
      ]
    });

    await expect(item.save()).rejects.toThrow();
  });

  test('should trim whitespace from item name', async () => {
    const item = new Item({
      name: '  Bread  ',
      locations: [
        {
          storeId: new mongoose.Types.ObjectId(),
          locationDetails: 'Bakery section'
        }
      ]
    });

    await item.save();
    expect(item.name).toBe('Bread');
  });

  test('should allow item without locations', async () => {
    const item = new Item({
      name: 'Generic Item'
    });

    await item.save();
    expect(item.name).toBe('Generic Item');
    expect(item.locations).toHaveLength(0);
  });

  test('should allow multiple locations for an item', async () => {
    const item = new Item({
      name: 'Apples',
      locations: [
        {
          storeId: new mongoose.Types.ObjectId(),
          locationDetails: 'Produce section, front'
        },
        {
          storeId: new mongoose.Types.ObjectId(),
          locationDetails: 'Organic produce, back left'
        }
      ]
    });

    await item.save();
    expect(item.locations).toHaveLength(2);
    expect(item.locations[0].locationDetails).toBe('Produce section, front');
    expect(item.locations[1].locationDetails).toBe('Organic produce, back left');
  });

  test('should require locationDetails when location is provided', async () => {
    const item = new Item({
      name: 'Test Item',
      locations: [
        {
          storeId: new mongoose.Types.ObjectId()
        }
      ]
    });

    await expect(item.save()).rejects.toThrow();
  });

  test('should validate storeId as ObjectId', async () => {
    const item = new Item({
      name: 'Test Item',
      locations: [
        {
          storeId: 'invalid-id',
          locationDetails: 'Some location'
        }
      ]
    });

    await expect(item.save()).rejects.toThrow();
  });
});