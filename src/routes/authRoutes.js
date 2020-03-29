import { Router } from 'express';

const authRoutes = Router();

authRoutes
  .route('/login')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post((req, res) => {
    res.send('new test');
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
