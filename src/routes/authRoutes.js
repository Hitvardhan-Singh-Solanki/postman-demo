import { Router } from 'express';
import User from '../schemas/User';

const authRoutes = Router();

authRoutes
  .route('/login')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post(({ body }, res) => {
    User.findOne({ email: body.emailAddress }).exec((error, data) => {
      if (error) return res.status(404).send('USER NOT FOUND');
      res.json(data);
    });
  });

authRoutes
  .route('/signup')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post((req, res) => {
    res.send(req.body);
  });

export default authRoutes;
