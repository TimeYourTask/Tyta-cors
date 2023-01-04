exports.isAuthorized =
  (...rolesGranted) =>
  (req, res, next) => {
    if (!req.role) return res.status(401).json({ message: 'Access denied!' });

    const roles = [...rolesGranted];

    const isGranted = roles.includes(req.role);
    if (!isGranted) return res.status(401).json({ message: 'Access denied!' });

    next();
  };
