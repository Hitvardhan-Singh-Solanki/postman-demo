import { Router } from 'express';
import authRoutes from './authRoutes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);

export default apiRouter;
