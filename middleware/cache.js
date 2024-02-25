// cache.js

const cache = require('memory-cache');

// Time in milliseconds for the cache to live
const CACHE_TTL = 60 * 1000; // 1 minute

function getKey(req) {
  return req.originalUrl || req.url;
}

function cacheMiddleware(req, res, next) {
  const key = getKey(req);
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log('Cache hit!');
    res.json(cachedData);
  } else {
    const originalSend = res.send;

    res.send = function (body) {
      // Cache the response body
      cache.put(key, body, CACHE_TTL);

      // Call the original send function
      originalSend.call(this, body);
    };

    next();
  }
}

module.exports = cacheMiddleware;
