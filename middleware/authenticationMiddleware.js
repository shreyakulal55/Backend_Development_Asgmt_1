// authenticationMiddleware.js

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const authenticationMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach the user information to the request for further use
    req.user = decoded;
    next();
  });
};

module.exports = authenticationMiddleware;
