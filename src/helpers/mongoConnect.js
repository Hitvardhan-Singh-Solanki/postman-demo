import mongoose from 'mongoose';
import { MONGO_URI, PORT } from '../utils/constants';

export default () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`App listening on PORT ${PORT}`);
  });
};
