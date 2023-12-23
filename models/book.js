// DEPENDENCIES
const mongoose = require("mongoose");

// create Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  completed: Boolean,
});

// compose our model from the schema
const Book = mongoose.model("Book", bookSchema);

// Exports
module.exports = Book;