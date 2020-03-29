import { Router } from 'express';

const protectedRoutes = Router();

protectedRoutes.route('/test').get((_, res) => {
  res.status(200).send('in protected route');
});

export default protectedRoutes;
