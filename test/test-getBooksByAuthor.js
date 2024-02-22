const mongoose = require('mongoose');
const assert = require('assert');
const {getBookByAuthor, addNewBook, closeConnection, connectToMongoDB} = require('../index');
const URIs = {
  validURI: {uri: 'mongodb://localhost/Demo', connectionResult: true},
  invalidURI: {uri: 'mongod://localhost/Demo', connectionResult: false},
  testURI: {uri: 'mongodb://localhost/Test', connectionResult: true},
};

const getBookByAuthorTestCases = [
  {
    input: 'F. Scott Fitzgerald',
    output: ['1234', '1235', '1236'],
  },
  {
    input: 'John',
    output: [],
  },
];
const populate = async () => {
  await addNewBook('1234',
      'The Great Gatsby',
      'F. Scott Fitzgerald',
      180,
      ['Fiction', 'Classics'],
      'Scribner',
      18,
  );
  await addNewBook('1235',
      'The Great Gatsby',
      'F. Scott Fitzgerald',
      180,
      ['Fiction', 'Classics'],
      'Scribner',
      18,
  );
  await addNewBook('1236',
      'The Great Gatsby',
      'F. Scott Fitzgerald',
      180,
      ['Fiction', 'Classics'],
      'Scribner',
      18,
  );
  await addNewBook('5678',
      'Pride and Prejudice',
      'Jane Austen',
      279,
      ['Fiction', 'Romance', 'Classics'],
      'T. Egerton, Whitehall',
      16,
  );
};
describe('getBookByAuthorName test', ()=> {
  before(async () => {
    await connectToMongoDB(URIs.testURI.uri);
    await populate();
  });
  getBookByAuthorTestCases.forEach((testcase)=>{
    it(`should return ${testcase.output?
      'books with ID ['+testcase.output.join(', ') + ']':
      'null'} for input ${testcase.input}`, async ()=> {
      const books = await getBookByAuthor(testcase.input);
      assert.strictEqual(books.length, testcase['output'].length);
      books.forEach((book)=>{
        assert.ok(testcase.output.includes(book.bookId));
      });
    });
  });
  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await closeConnection();
  });
});
