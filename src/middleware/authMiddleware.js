const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== undefined) {
    jwt.verify(token, jwtKey, (error, result) => {
      if (error) {
        res.status(403);
        res.json({ message: 'Access Forbidden : Invalid Token' });
      } else {
        res.locals.user = result;
        next();
      }
    });
  } else {
    res.status(403);
    res.json({ message: 'Access Forbidden : Missing Token' });
  }
};
