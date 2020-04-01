import { Router } from 'express';
import User from '../schemas/User';
import passport from 'passport';
import auth from '../config/auth';
import { userResponsObject } from '../utils/index';
import { visitorsList } from '../sockets/visited';

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
        return res.status(404).json({ error: 'User not found' });
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }

        return res.status(200).send(userResponsObject(user));
      });
    })(req, res, next);
  });

authRoutes
  .route('/signup')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post(({ body: { email, password } }, res) => {
    const user = new User({
      email: email,
      password,
      image: `https://img.icons8.com/color/96/000000/circled-user-male-skin-type-4.png`
    });
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

authRoutes.route('/check-token').get(auth.ensureAuthenticated, (req, res) => {
  res.status(200).json(userResponsObject(req.user));
});

authRoutes.route('/history').get(auth.ensureAuthenticated, (req, res) => {
  res.status(200).json(visitorsList());
});

export default authRoutes;
