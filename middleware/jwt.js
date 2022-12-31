const jwt = require("jsonwebtoken");

exports.validateJWT = (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).json({ message: "JWT token is required" });
    }

    jwt.verify(token, "secret", function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }

      req.body.userId = decoded._id;
    });
    console.log(req.body);
    next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};
