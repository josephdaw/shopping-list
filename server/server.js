// install dependencies
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('@josephdaw/error-handler');
// local imports
const { connectToMongoDB } = require('./db/connection');
const apiRoutes = require('./api');

const PORT = process.env.PORT || '3001';

const app = express();

// connect to MongoDB
connectToMongoDB();

app.use(cors());
app.use(express.json());

// REST routes
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// catch-all error handler
app.use((err, req, res, next) => {
  console.log(err);
});