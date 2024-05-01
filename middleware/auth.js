// require jsonwebtoken
const jwt = require("jsonwebtoken");

// require env variable from ./config.js
const { SECRET_KEY } = require("../utilities/config");

// create auth object
const auth = {
  isAuthenticated: async (req, res, next) => {
    try {
      // get token from request header
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // verify token
      const decoded = await jwt.verify(token, SECRET_KEY);

      // set user in request
      req.token = token;
      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        return res.status(500).json({ message: err.message });
      }
    }
  },
};

// export auth
module.exports = auth;
