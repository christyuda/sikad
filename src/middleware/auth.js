const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Token Tidak Diberikan" });
  }

  const tokenParts = token.split('|');
  if (tokenParts.length === 2 && !isNaN(tokenParts[0])) {
    token = tokenParts[1];
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
