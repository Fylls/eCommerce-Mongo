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

  MongoClient.connect(mongoUrl)
    .then((client) => {
      _db = client.db();
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

/*

                                        O  L  D

MongoClient.connect("mongodb+srv://Filippo:6O4hCjBrvUs6JImO@cluster0-x6ihw.mongodb.net/test?retryWrites=true&w=majority")
    .then((client) => {
        const products = [];
        clienT.db()

                                        N  E  W

const db = require("../db");
db.getDB()

*/
