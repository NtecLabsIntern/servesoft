const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Use environment variables for security

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  // Check if authorization header is provided
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No authorization header provided.' });
  }

  // Check if authorization is in Bearer format
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    // Attach the user information to request object for further use
    req.user = user;
    next(); // Call next middleware/route handler
  });
}

module.exports = { authenticateToken };
