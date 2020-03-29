import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../schemas/User';

export default passport => {
  const newStrgy = new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({
        email
      })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'That email is not registered'
            });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch(err => console.log(err));
    }
  );

  passport.use(newStrgy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
