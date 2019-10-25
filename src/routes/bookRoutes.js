const express = require('express');

const bookRouter = express.Router();

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
  bookRouter.route("/").get((req, res) => {
    res.render("books", {
      nav: [
        { link: "/books", title: "Books" },
        { link: "/authors", title: "Authors" }
      ],
      title: "Library",
      books
    });
  });
  bookRouter.route("/:id").get((req, res) => {
    const { id } = req.params;
    //to iste ako const id = req.params.id
    res.render('singleBook',{
        nav: [
            { link: "/books", title: "Books" },
            { link: "/authors", title: "Authors" }
          ],
          title: "Library",
          book: books[id]
    })
  });
  
module.exports = bookRouter;