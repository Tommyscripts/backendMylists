const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

// Authenticate Middleware
function authUser (req, res, next) {
  const authHeader = req.headers.authorization || req.headers.token;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token found' });
  }

  const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token not valid' });
    }

    UserModel.findOne({ email: decoded.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }

        res.locals.user = user;
        next();
      })
      .catch(() => res.status(500).json({ error: 'Failed to authenticate user' }));
  });
}
function adminCheck (req, res, next) {
  if (res.locals.user.role === 'admin'){
    next()
  } else {
    res.status(401).json('Not authorized')
  }
}
function roleCheck (req, res, next) {
  if (res.locals.user.role === 'admin' || res.locals.user._id.toString() === req.params.id) {
    next()
  } else {
    res.status(403).json('Not Authorized')
  }
}
module.exports = {
  authUser,
  adminCheck,
  roleCheck
}