import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/apiRoutes';
import mongoConnect from './helpers/mongoConnect';
import { PORT, ORIGIN } from './utils/constants';
import passport from 'passport';
import passportConfig from './config/passport';

const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true
};

const sessionOptions = {
  secret: 'somesecret',
  resave: true,
  saveUninitialized: true
};

// configuring passport
passportConfig(passport);

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionOptions));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Cookie parser
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});
app.use('/api', apiRoutes);

app.listen(PORT, mongoConnect);
