import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes';
import mongoConnect from './helpers/mongoConnect';
import { PORT, ORIGIN } from './utils/constants';

var corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200
};

const app = express();
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use('/api', apiRoutes);

app.listen(PORT, mongoConnect);
