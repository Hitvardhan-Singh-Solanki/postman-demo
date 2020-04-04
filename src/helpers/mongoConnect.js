import mongoose from 'mongoose';

export default () => {
  mongoose.connect(
    process.env.MONGO_URI ||
      `mongodb://hitvardhan:HXUlABphtG9OoMyN@cluster0-shard-00-00-zi6lx.mongodb.net:27017,cluster0-shard-00-01-zi6lx.mongodb.net:27017,cluster0-shard-00-02-zi6lx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`App listening on PORT ${process.env.PORT}`);
  });
};
