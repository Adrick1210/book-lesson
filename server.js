// DEPENDENCIES
require("dotenv").config();
require("./config/db.js");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const Book = require("./models/book.js");
const app = express();
const { PORT = 3013 } = process.env;

// MIDDLE WARE
app.use(morgan("dev")); // logging
app.use(express.urlencoded({ extended: false }));
// how we get access to the req.body
app.use(methodOverride("_method"));

// ROUTES

// Index - Get render all books
app.get("/books", async (req, res) => {
  // find all of the books
  let books = await Book.find({});
  // render all of the books => index.ejs
  res.render("index.ejs", {
    books: books.reverse(),
  });
});

// New - Get for the form to create a new book
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});

// Delete
app.delete("/books/:id", async (req, res) => {
  try {
    let deletedBook = await Book.findByIdAndDelete(req.params.id);
    console.log(deletedBook);
    res.redirect("/books");
  } catch (error) {
    res.status(500).send("something went wrong when deleting");
  }
});

// Create - Post
app.post("/books", async (req, res) => {
  try {
    if (req.body.completed === "on") {
      // if checked
      req.body.completed = true;
    } else {
      // not checked
      req.body.completed = false;
    }
    let newBook = await Book.create(req.body);
    res.redirect("/books");
  } catch (err) {
    res.send(err);
  }
});

// Update
app.put("/books/:id", async (req, res) => {
  try {
  if (req.body.completed === "on") {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  let updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  )
  res.redirect(`/books/${updatedBook._id}`);
} catch (error){
  res.send("something went wrong with this route");
}
});

// Edit
app.get("/books/edit/:id", async (req, res) => {
  try {
    let foundBook = await Book.findByIdAndUpdate(req.params.id);
    res.render("edit.ejs", {
      book: foundBook,
    });
  } catch (error) {
    res.send("hello from the error");
  }
});

// Show
app.get("/books/:id", async (req, res) => {
  let foundBook = await Book.findById(req.params.id);
  // render the show.ejs with the foundBook
  res.render("show.ejs", {
    book: foundBook,
  });
});

// LISTENER
app.listen(PORT, () => console.log(`listening to the sound of ${PORT}`));
