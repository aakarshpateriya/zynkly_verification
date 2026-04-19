const jwt = require("jsonwebtoken");

const generateToken = (cleanerId) => {
  return jwt.sign(
    { cleanerId },
    process.env.JWT_SECRET,
    { expiresIn: "365d" } // long validity
  );
};

module.exports = generateToken;