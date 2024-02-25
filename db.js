// db.js

const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongoDB;
