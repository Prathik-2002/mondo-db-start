const mongoose = require('mongoose');
const assert = require('assert');
const {getBookByAuthor, closeConnection, connectToMongoDB} = require('../index');
const {populate} = require('./polulate');
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

describe('getBookByAuthorName test', ()=> {
  describe('Test with mongoDB connection', ()=> {
    before(async () => {
      await connectToMongoDB(URIs.testURI.uri);
      await populate();
    });
    getBookByAuthorTestCases.forEach((testcase)=>{
      it(`should return
        'books with ID [ ${testcase.output.join(', ')} for input ${testcase.input}`, async ()=> {
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
  describe('Test with invalid MongoDB Connection', () => {
    before(async () => {
      await connectToMongoDB(URIs.invalidURI.uri);
      await populate();
    });
    getBookByAuthorTestCases.forEach((testcase)=>{
      it(`should return null}`, async ()=> {
        assert.strictEqual(await getBookByAuthor(testcase.input), null);
      });
    });
  });
});
