// DEPENDENCIES
require("dotenv").config();
require("./config/db.js");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const Book = require("./models/book.js");
const app = express();
const { PORT = 3013 } = process.env;
const seedData = require("./models/seed.js");
const booksRouter = require("./routes/books.js");

// MIDDLE WARE
app.use((req, res, next) => {
  req.model = {
    Book,
    seedData,
  };
  console.log("This is middle ware");
  next();
});
app.use(morgan("dev")); // logging
app.use(express.urlencoded({ extended: false }));
// how we get access to the req.body
app.use(methodOverride("_method"));

app.use("/public", express.static("public"));


// ROUTES
app.use("/books", booksRouter);

// LISTENER
app.listen(PORT, () => console.log(`listening to the sound of ${PORT}`));
