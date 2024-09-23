const jwt = require('jsonwebtoken');

const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    // Assuming the token is in the headers
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ message: 'Access forbidden: No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Access forbidden: Invalid token.' });
      }

      // Check if user's role is in the allowed roles
      const hasAccess = user.roles.some(role => allowedRoles.includes(role));
      if (!hasAccess) {
        return res.status(403).json({ message: 'Access forbidden: You do not have permission.' });
      }

      req.user = user; // Attach user info to the request
      next();
    });
  };
};

module.exports = authorizeRoles;
