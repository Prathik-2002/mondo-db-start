const Book = require('./schema');
const isExist = async (id) => {
  const isExists = await Book.exists({bookId: id});
  if (isExists === null) {
    return false;
  }
  return true;
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
    return false;
  }
};

const changePublisherById = async (id, newPublisher) => {
  try {
    if (!await isExist(id)) {
      return false;
    }
    await Book.updateMany({bookId: id}, {$set: {publisher: newPublisher}});
    return true;
  } catch (err) {
    return false;
  }
};
const deleteBookById = async (id) => {
  try {
    if (await isExist(id)) {
      await Book.deleteMany().where('bookId').equals(id);
      return true;
    }
    return false;
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
  isExist,
};
