import 'babel-polyfill';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/apiRoutes';
import mongoConnect from './helpers/mongoConnect';
import { ORIGIN } from './utils/constants';
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
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
};

// configuring passport
passportConfig(passport);

const app = express();

const expressSession = session(sessionOptions);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Cookie parser
app.use(cookieParser());
app.use(headers);

app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to postman');
});
const server = socket(app, expressSession);
server.listen(process.env.PORT, mongoConnect);
