const {MongoClient} = require('mongodb');
const URI = 'mongodb://localhost:27017';

// const testDB = 'Test';
const DemoDB = 'Demo';

const addNewBook = async (Library, book) => {
  try {
    await Library.insertOne(book);
    console.log('Added book');
  } catch (err) {
    console.log('Unable to insert', err);
  }
};
const getBookByAuthor = async (Library, authorName) => {
  try {
    const books = await Library.find({author: authorName});
    const booksList = await books.toArray();
    if ( booksList.length > 0 ) {
      console.table(booksList);
    } else {
      console.log('No Books found');
    }
  } catch (err) {
    console.log('Unable to find books');
  }
};
const displayAllBooks = async (Library) => {
  try {
    const books = await Library.find({}, {_id: 0});
    return await books.toArray();
  } catch (err) {
    console.log('Unable to display books');
  }
};
const IncrementBookAgeById = async (Library, id) => {
  try {
    await Library.updateMany({bookId: id}, {$inc: {age: 1}});
    console.log('Updated');
  } catch (err) {
    console.log('Unable to update age');
  }
};
const getBookCountByBookName = async (Library, bookName) => {
  try {
    const books = await Library.find({bookName: bookName});
    const bookslist = await books.toArray();
    return bookslist.length;
  } catch (err) {
    console.log('Unable to count books');
  }
};
const deleteBookById = async (Library, bookId) => {
  try {
    await Library.deleteMany({bookId: bookId});
    console.log('Book deleted successfully');
  } catch (err) {
    console.log('Unable to delete book');
  }
};


async function start() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    console.log('Connection successfully established');
    const database = client.db(DemoDB);
    const collectionName = 'Library';
    const Library = database.collection(collectionName);
    Library.createIndex({bookId: 1}, {unique: true});
    await addNewBook(Library, {
      bookId: 121,
      bookName: 'The Jungle Book',
      author: 'Rudyard Kipling',
      pageCount: '409',
      genre: ['Adventure', 'Fiction'],
      publication: 'Macmillan',
      age: 3,
    });
    await addNewBook(Library, {
      bookId: 321,
      bookName: 'The Jungle Book',
      author: 'Rudyard Kipling',
      pageCount: '409',
      genre: ['Adventure', 'Fiction'],
      publication: 'Macmillan',
      age: 3,
    });
    await addNewBook(Library, {
      bookId: 562,
      bookName: 'Pennywise',
      author: 'Stephan King',
      pageCount: '890',
      genre: ['Horror', 'Thriller'],
      publication: 'Simon & Schuster',
      age: 7,
    });
    await addNewBook(Library, {
      bookId: 2323,
      bookName: 'Hunger Games',
      author: 'Suzanne Collins',
      pageCount: '898',
      genre: ['Adventure', 'Fiction', 'Sci-Fi'],
      publication: 'Scholastic',
      age: 2,
    });
    await addNewBook(Library, {
      bookId: 8344,
      bookName: 'Pride and Prejudice',
      author: 'Jane Austen',
      pageCount: '490',
      genre: ['Romance'],
      publication: 'Simon & Schuster',
      age: 1,
    });
    await getBookByAuthor(Library, 'Jane Austen');
    const noOfbooks = await getBookCountByBookName(Library, 'The Jungle Book');
    console.log('The jungle Book count is: ' + noOfbooks);
    console.table(await displayAllBooks(Library));
    await deleteBookById(Library, 2323);
    await IncrementBookAgeById(Library, 8344);
    console.table(await displayAllBooks(Library));
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}
start();
