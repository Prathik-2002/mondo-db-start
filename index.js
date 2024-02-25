const Book = require('./schema');
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
    return false;
  }
};
const getAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (err) {
    return null;
  }
};
const getBookByAuthor = async (author) => {
  try {
    const books = await Book.find().where('author').equals(author);
    return books;
  } catch (err) {
    return null;
  }
};

module.exports = {
  addNewBook,
  getAllBooks,
  getBookByAuthor,
  changePublisherById,
  deleteBookById,
};
