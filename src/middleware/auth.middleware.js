const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== undefined) {
    jwt.verify(token, jwtKey, (error) => {
      if (error) {
        res.status(403);
        res.json({ message: 'Access Forbidden : Invalid Token' });
      } else {
        const { id, role } = jwt.decode(token);
        req.userId = id;
        req.role = role;
        next();
      }
    });
  } else {
    res.status(403);
    res.json({ message: 'Access Forbidden : Missing Token' });
  }
};
