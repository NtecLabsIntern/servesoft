const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const authorize = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided, access denied' });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token, access denied' });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied, insufficient permissions' });
      }

      req.user = user;
      next();
    });
  };
};

module.exports = authorize;
