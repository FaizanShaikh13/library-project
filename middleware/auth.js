const jwt = require("jsonwebtoken");
const config = process.env;
const { User } = require("../models");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"]

  if (!token) {
    return res.status(403).send("A token is required");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);

    let user = await User.findOne({
      where: { id: decoded.user_id },
      attributes: { exclude: ["password", "created_at", "updated_at"] },
    });
    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;