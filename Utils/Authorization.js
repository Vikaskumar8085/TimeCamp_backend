// Role authorization middleware for multiple roles
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles; // This is now an array of roles
    const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      return res
        .status(403)
        .json({ message: "Access forbidden: Insufficient permissions" });
    }

    next();
  };
};

// authorizeRole(['manager', 'contractor']),
