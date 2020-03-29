import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { matchRoutes } from 'react-router-config';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import apiRoutes from './routes/apiRoutes';
import routes from './client/routes';
import mongoConnect from './helpers/mongoConnect';
import { PORT } from './utils/constants';

var corsOptions = {
  origin: 'http://localhost:3000',
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

app.get('*', (req, res) => {
  const store = createStore();
  const promiseArr = matchRoutes(routes, req.path).map(({ route }) => {
    if (route.loadData) return route.loadData(store);
  });
  Promise.all(promiseArr).then(() => {
    res.send(renderer(req, store));
  });
});

app.listen(PORT, mongoConnect);
