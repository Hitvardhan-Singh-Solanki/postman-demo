import { Router } from 'express';
import authRoutes from './authRoutes';
import protectedRoutes from './protectedRoutes';
import auth from '../config/auth';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/protected', auth.ensureAuthenticated, protectedRoutes);

export default apiRouter;
