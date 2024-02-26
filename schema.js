const mongoose=require('mongoose');

const BookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    unique: true,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: Number,
  genre: [String],
  publisher: String,
  age: Number,
});
module.exports = mongoose.model('Book', BookSchema);

