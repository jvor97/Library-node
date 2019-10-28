const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require('passport');
const cookieParser = require('cookie-parsee');
const session = require('express-session');

const app = express();

require('./src/config/passport')(app);

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'library'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);

app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
  { link: "/books", title: "Books" },
  { link: "/authors", title: "Authors" }
];
const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRoutes")(nav);
const authRouter = require("./src/routes/authRoutes")(nav);
app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname,'/views/index.html'));
  res.render("index", {
    nav,
    title: "Library"
  });
});

app.listen(3000, () => {
  debug(`listening on port ${chalk.green("3000")}`);
});
