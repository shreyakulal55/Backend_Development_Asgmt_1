// createIndexes.js

const connectToMongoDB = require('./db');

async function createIndexes() {
  try {
    await connectToMongoDB();

    // Access the 'blogs' collection and create an index on the 'users' field
    await mongoose.connection.collection('blogs').createIndex({ users: 1 });
    
    // Access the 'users' collection and create an index on the 'blogs' field
    await mongoose.connection.collection('users').createIndex({ blogs: 1 });

    console.log('Indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from MongoDB after creating indexes
  }
}

createIndexes();
