// token based authentication approach
// creating a token which I return to my client side app, to the react app which then could
// theoretically handle that token to authenticate itself to my backend for future requests

const Router = require("express").Router;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const mongodb = require("mongodb");
const db = require("../db");

const router = Router();

const createToken = () => {
  return jwt.sign({}, "secret", { expiresIn: "1h" });
};

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Check if user login is valid
  // If yes, create token and return it to client
  const token = createToken();
  // res.status(200).json({ token: token, user: { email: 'dummy@dummy.com' } });
  res
    .status(401)
    .json({ message: "Authentication failed, invalid username or password." });
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Hash password before storing it in database => Encryption at Rest
  bcrypt
    .hash(pw, 12)
    .then((hashedPW) => {
      // Store hashedPW in database

      db.getDB()
        .db()
        .collection("users")
        .insertOne({
          email: email,
          password: hashedPW,
        })
        .then((result) => {
          console.log(result);
          const token = createToken();
          res.status(201).json({ token: token, user: { email: email } });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Creating the user failed." });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Creating the user failed." });
    });
});

// Adding an index to make the email fieeld unique
// [shell] db.users.createIndex({ email: 1 }, { unique: true });

module.exports = router;
