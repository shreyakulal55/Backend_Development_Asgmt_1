const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cacheMiddleware = require('./middleware/cache');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');

// Load environment variables from .env file
dotenv.config();

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Your other server setup code...
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/blogs', authenticationMiddleware, cacheMiddleware, blogRoutes); // Use caching and authentication middleware for blogs

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
