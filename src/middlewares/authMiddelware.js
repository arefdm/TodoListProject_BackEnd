import jwt from 'jsonwebtoken';
import { config } from '../core/config/index.js';

export const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing. Token required.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Authorization format is Bearer <token>' });
  }

  const token = parts[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing. Please provide a token.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret.secret);
    req.user = decoded;
    console.log( decoded);
    console.log( req.user);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};