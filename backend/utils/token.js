const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ _id: user._id, admin: user.isAdmin }, process.env.JWT_SECRET);
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified.admin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

const decodeToken = (req) => {
  const token = req.headers.authorization;
  const tokenValue = token.replace("Bearer ", "");
  return jwt.verify(tokenValue, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken, decodeToken };
