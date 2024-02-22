const mongoose = require('mongoose');
const Book = require('./schema');

const connectToMongoDB =async (URI) => {
  try {
    await mongoose.connect(URI);
    return true;
  } catch (err) {
    console.log('Unable to connect');
    return false;
  }
};
const closeConnection = async () => {
  await mongoose.disconnect();
  console.log('Connection closed');
};
const addNewBook = async (id, name, author, pages, genre, publisher, age) => {
  try {
    await Book.create({
      bookId: id,
      bookName: name,
      author: author,
      pages: pages,
      genre: genre,
      publisher: publisher,
      age: age,
    });
    return true;
  } catch (err) {
    console.log('Insertion failed');
    return false;
  }
};

const changePublisherById = async (id, newPublisher) => {
  try {
    const isExists = await Book.exists({bookId: id});
    if (isExists === null) {
      throw new 'Book does not exist';
    }
    await Book.updateMany({bookId: id}, {$set: {publisher: newPublisher}});
    return true;
  } catch (err) {
    console.log('Update failed');
    return false;
  }
};
const deleteBookById = async (id) => {
  try {
    const isExists = await Book.exists({bookId: id});
    if (isExists === null) {
      throw new 'Book does not exist';
    }
    await Book.deleteMany().where('bookId').equals(id);
    return true;
  } catch (err) {
    console.log('Delete failed');
    return false;
  }
};
const getAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (err) {
    console.log('Failed to get all books');
    return null;
  }
};
const getBookByAuthor = async (author) => {
  try {
    const books = await Book.find().where('author').equals(author);
    return books;
  } catch (err) {
    console.log('Unable to get Book');
    return null;
  }
};

module.exports = {
  connectToMongoDB,
  closeConnection,
  addNewBook,
  getAllBooks,
  getBookByAuthor,
  changePublisherById,
  deleteBookById,
};
