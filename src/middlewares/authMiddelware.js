import jwt from 'jsonwebtoken';
import { config } from '../core/config/index.js';

export const authentication = (req, res, next) => {

  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Token missing.' });
  }


  try {
    const decoded = jwt.verify(token, config.jwtSecret.secret);
    req.user = decoded;
    console.log( decoded);
    console.log( req.user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};