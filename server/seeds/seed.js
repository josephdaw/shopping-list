// require('dotenv').config();

const { connectToMongoDB, closeMongoDBConnection } = require('../db/connection');
const User = require('../models/User');
const Item = require('../models/Item');
const Store = require('../models/Store');

const userData = require('./userData.json');
const storeData = require('./storeData.json');
const itemData = require('./itemData.json');
const shoppingListData = require('./shoppingListData.json');


runSeed = async () => {
  // connect to database
  connectToMongoDB();


  // clean database
  await User.deleteMany({});
  await Store.deleteMany({});
  await Item.deleteMany({});

  // bulk create each model

  const stores = await Store.insertMany(storeData)

  for (const item of itemData) {
    const newItem = new Item(item);
    const store = (await Store.aggregate([{ $sample: { size: 1 } }]))[0];
    newItem.locations = [{
      storeId: store._id,
      locationDetails: item.locationDetails
    }];
    await newItem.save();
  }

  const users = userData.map(user => new User(user));
  for (const user of users) {
    if (user.firstName === 'Joseph') {
      for (const item of shoppingListData) {
        const foundItem = await Item.findOne({ name: item.name });
        if (foundItem) {
          user.shoppingList.push({
            itemId: foundItem._id,
            quantity: item.quantity
          });
        }
      }
      await user.save();
    }
  }

  

  

  console.log(users.length + ' users seeded');
  console.log(stores.length + ' stores seeded');

  console.log('all done!');
  await closeMongoDBConnection()
  process.exit = 0;
  // });
}

runSeed();

