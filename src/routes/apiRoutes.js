import { Router } from 'express';
import authRoutes from './authRoutes';
import protectedRoutes from './protectedRoutes';
import withAuth from '../middlewares/withAuth';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/protected', withAuth, protectedRoutes);

export default apiRouter;
