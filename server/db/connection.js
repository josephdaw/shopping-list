const mongoose = require('mongoose');

let connection;
// const dbURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/utm';
const dbURL = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping';

const connectToMongoDB = async () => {
  if (connection) {
    return connection;
  }

  try {
    console.log(dbURL)
    await mongoose.connect(dbURL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error)
  }


  mongoose.connection.on('error', err => {
    console.log('Error occurred with MongoDB', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

  connection = mongoose.connection;
  return connection;
}

const closeMongoDBConnection = async () => {
  if (connection) {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
}

module.exports = {connectToMongoDB, closeMongoDBConnection};