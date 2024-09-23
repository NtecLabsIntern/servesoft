const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];
  
  // If there's no token, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access forbidden: No token provided.' });
  }

  // Verify the token using your secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access forbidden: Invalid token.' });
    }

    // Attach the user information to the request object for later use
    req.user = user; 
    next(); // Move to the next middleware or route handler
  });
};

module.exports = authenticateToken;
