import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to extract the token from the Authorization header
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).json({ message: 'Access denied. No token provided.' });
  }
}

// Middleware to verify the token
function verifyToken(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token.' });
    } else {
      req.user = decoded;
      next();
    }
  });
}

export { ensureToken, verifyToken };
