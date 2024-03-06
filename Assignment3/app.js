const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cacheMiddleware = require('./middleware/cache');
const authenticationMiddleware = require('./middleware/authenticationMiddleware'); // Add this line
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
console.log('MongoDB URI:"mongodb+srv://shreyakulal55:shreyakulal55@cluster0.txtqget.mongodb.net/"', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(bodyParser.json());
app.use(authenticationMiddleware);
app.use('/users', userRoutes);
app.use('/blogs', cacheMiddleware, blogRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(passport.initialize());
app.use(passport.session()); 