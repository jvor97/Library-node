const express = require("express");
const debug = require("debug")("app:authRoutes");
const { MongoClient } = require("mongodb");

const authRouter = express.Router();

function router() {
  authRouter.route("/signUp").post((req, res) => {
    const { username, password } = req.body;
    const url = "mongodb:/localhost:27017";
    const dbName = "libraryApp";

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected to server");

        const db = client.db(dbName);

        const col = await db.collection("users");
        const user = { username, password };
        const result = await col.insertOne(user);
        debug(result);
      } catch (error) {
        debug(error);
      }
    });
    req.login(req.body, () => {
      res.redirect("/auth/profile");
    });
  });
  authRouter.route("/profile").get((req, res) => {
    res.json(req.user);
  });

  return authRouter;
}

module.exports = router;
