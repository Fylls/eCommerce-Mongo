//                                      CONNECTION POOLING:
// Provided by the mongodb driver

// You can handle multiple incoming requests to your node restAPI simultanenuously,
// because you can only send one request per connection to mongodb normally but,
// since you have a connection pool here of multiple available connections,
// even if you have multiple incoming connections to nodejs, you can forward them to mongodb
// thanks to this connection pooling.

// So this is also an advantage of this approach where we reuse one client because here, we actually have
// a shared connection pool then.

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const mongoUrl =
  "mongodb+srv://Filippo:6O4hCjBrvUs6JImO@cluster0-x6ihw.mongodb.net/test?retryWrites=true&w=majority";

let _db;

const initDB = (callBack) => {
  if (_db) {
    console.log("db is already initialized");
    return callBack(null, _db);
  }

  MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then((client) => {
      _db = client;
      callBack(null, _db);
    })
    .catch((err) => callBack(err));
};

const getDB = () => {
  if (!_db) {
    throw Error("db not initialized");
  }
  return _db;
};

// making functions callable
module.exports = {
  initDB,
  getDB,
};

//                          O  L  D

// MongoClient.connect("mongodb+srv://Filippo:6O4hCjBrvUs6JImO@cluster0-x6ihw.mongodb.net/test?retryWrites=true&w=majority")
//    .then((client) => {
//        const products = [];
//       client.db()

//                          N  E  W

// const db = require("../db");
// db.getDB()
