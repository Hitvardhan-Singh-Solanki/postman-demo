import { Router } from 'express';
import User from '../schemas/User';
import jwt from 'jsonwebtoken';
import { secret } from '../utils/constants';
import withAuth from '../middlewares/withAuth';

const authRoutes = Router();

authRoutes
  .route('/login')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post(({ body }, res) => {
    User.findOne({ email: body.emailAddress }, (err, user) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else if (!user) {
        res.status(401).json({
          error: 'Incorrect email or password'
        });
      } else {
        user.isCorrectPassword(body.password, (err, same) => {
          if (err) {
            res.status(500).json({
              error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401).json({
              error: 'Incorrect email or password'
            });
          } else {
            const payload = { email: body.emailAddress };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res
              .cookie('token', token, { httpOnly: true, path: '/' })
              .sendStatus(200);
          }
        });
      }
    });
  });

authRoutes
  .route('/signup')
  .get((_, res) => {
    res.status(405).send('not allowed');
  })
  .post(({ body: { emailAddress, password } }, res) => {
    const user = new User({ email: emailAddress, password });
    user.save(err => {
      if (err) {
        res.status(500).json({
          message: 'Error registering new user please try again.',
          err
        });
      } else {
        res.status(200).send('Welcome to the club!');
      }
    });
  });

authRoutes.route('/check-token').get(withAuth, function(req, res) {
  res.status(200).send('token valid');
});

export default authRoutes;
