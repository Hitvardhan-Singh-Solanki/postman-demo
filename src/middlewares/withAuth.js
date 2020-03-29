import jwt from 'jsonwebtoken';
import { secret } from '../utils/constants';

export default (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).send('Unauthorized: Invalid token');
      else {
        req.email = decoded.email;
        next();
      }
    });
  }
};
