import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy } from 'passport-google-oauth2';
import { matchRoutes } from 'react-router-config';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import routes from './client/routes';
import User from './schemas/User';

const MONGO_URI = `mongodb+srv://hitvardhan:HXUlABphtG9OoMyN@cluster0-zi6lx.mongodb.net/test?retryWrites=true&w=majority`;

passport.use(
  new Strategy(
    {
      clientID:
        '498742314609-g6uoqf4f5cljcdt7e2fqgo0elfsptpul.apps.googleusercontent.com',
      clientSecret: 'aWQQsbwcvHnYquqy57Ba0jTx',
      passReqToCallback: true,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(token, tokenSecret, profile, done) {
      console.log('test', token, tokenSecret, profile);
      done('some error', 'ett', 'asfsgfd');
    }
  )
);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());

app.get('/api/*', (req, res) => {
  res.send('test');
});
app.post('/api/auth', (req, res) => {
  let chris = new User({
    name: 'Chris',
    email: 'test@gmail.com',
    username: 'sevilayha',
    password: 'password'
  });
  chris.save(err => {
    if (err) console.log(err);
    console.log('User saved successfully!');
  });

  res.send('test');
});
app.get('*', (req, res) => {
  const store = createStore();
  const promiseArr = matchRoutes(routes, req.path).map(({ route }) => {
    if (route.loadData) return route.loadData(store);
  });
  Promise.all(promiseArr).then(() => {
    res.send(renderer(req, store));
  });
});
app.listen(3000, () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`App listening on PORT 3000`);
  });
});
