// roles.js

/**
 * Middleware to check if the user has the required role to access a resource.
 * @param {Array} allowedRoles - Array of roles that are permitted to access the route.
 */
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      try {
        // Assume `req.user` contains the decoded JWT payload with the user's role
        const userRole = req.user.role;
  
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ message: "Access forbidden: Insufficient permissions." });
        }
  
        next(); // User has the required role, proceed to the next middleware/controller
      } catch (error) {
        res.status(500).json({ message: "Internal server error.", error });
      }
    };
  };
  
  module.exports = roleMiddleware;
  