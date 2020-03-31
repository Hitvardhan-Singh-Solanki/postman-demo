import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/apiRoutes';
import mongoConnect from './helpers/mongoConnect';
import { PORT, ORIGIN, SECRET } from './utils/constants';
import passport from 'passport';
import passportConfig from './config/passport';
import socket from './config/socket';
import headers from './middlewares/headers';

const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true
};

const sessionOptions = {
  secret: SECRET,
  resave: true,
  saveUninitialized: true
};

// configuring passport
passportConfig(passport);

const app = express();

const server = socket(app);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionOptions));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Cookie parser
app.use(cookieParser());
app.use(headers);
app.use('/api', apiRoutes);
server.listen(PORT, mongoConnect);
