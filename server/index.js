const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define your API routes here

app.listen(PORT, async () => {
    await prisma.$connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
