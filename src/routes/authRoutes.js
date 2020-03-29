import { Router } from 'express';
import User from '../schemas/User';
import jwt from 'jsonwebtoken';
import { secret } from '../utils/constants';
import withAuth from '../middlewares/withAuth';
import passport from 'passport';
import auth from '../config/auth';

const authRoutes = Router();

authRoutes
  .route('/login')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.sendStatus(402);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.sendStatus(200);
      });
    })(req, res, next);
  });

authRoutes
  .route('/signup')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post(({ body: { email, password } }, res) => {
    const user = new User({ email: email, password });

    console.log(user);

    user.save(err => {
      if (err) {
        res.status(500).json({
          message: 'Error registering new user please try again.',
          err
        });
      } else {
        res.sendStatus(200);
      }
    });
  });

authRoutes.route('/logout').get((req, res, next) => {
  req.logOut();
  res.sendStatus(200);
});

authRoutes
  .route('/check-token')
  .get(auth.ensureAuthenticated, function(req, res) {
    res.status(200).send('token valid');
  });

export default authRoutes;
