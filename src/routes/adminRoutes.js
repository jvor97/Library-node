const express = require("express");
const debug = require("debug")('app:adminRoutes');
const { MongoClient } = require("mongodb");

const adminRouter = express.Router();
const books = [
  {
    author: "Chinua Achebe",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958
  },
  {
    author: "Hans Christian Andersen",
    pages: 784,
    title: "Fairy tales",
    year: 1836
  },
  {
    author: "Dante Alighieri",
    pages: 928,
    title: "The Divine Comedy",
    year: 1315
  },
  {
    author: "Unknown",
    pages: 160,
    title: "The Epic Of Gilgamesh",
    year: -1700
  },
  {
    author: "Unknown",
    pages: 176,
    title: "The Book Of Job",
    year: -600
  },
  {
    author: "Unknown",
    pages: 288,
    title: "One Thousand and One Nights",
    year: 1200
  }
];

function router(nav) {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "LibraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected to server");

        const db = client.db(dbName);

        const response = await db.collection("books").insertMany(books);
        res.json(response);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();
  });
  return adminRouter;
}

module.exports = router;
