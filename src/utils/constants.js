const MONGO_USER = 'hitvardhan';
const MONGO_PASS = 'HXUlABphtG9OoMyN';

export const saltRounds = 10;
export const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@cluster0-shard-00-00-zi6lx.mongodb.net:27017,cluster0-shard-00-01-zi6lx.mongodb.net:27017,cluster0-shard-00-02-zi6lx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
// export const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-zi6lx.mongodb.net/test?retryWrites=true&w=majority`;
export const PORT = 8080;
export const ORIGIN = 'http://localhost:3000';
export const SECRET = 'some-cystic-string-secret-name-should-not-come';
