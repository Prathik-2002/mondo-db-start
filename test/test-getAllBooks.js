const mongoose = require('mongoose');
const assert = require('assert');
const {closeConnection, connectToMongoDB, getAllBooks} = require('../index');
const {populate} = require('./polulate');

const URIs = {
  validURI: {uri: 'mongodb://localhost/Demo', connectionResult: true},
  invalidURI: {uri: 'mongod://localhost/Demo', connectionResult: false},
  testURI: {uri: 'mongodb://localhost/Test', connectionResult: true},
};

const expectedoutputIds = ['1234', '1235', '1236', '5678'];
describe('getAllBooks test', ()=> {
  describe('Test with mongoDB connection', ()=> {
    before(async () => {
      await connectToMongoDB(URIs.testURI.uri);
      await populate();
    });
    it(`should return ${expectedoutputIds.join(', ')}`, async ()=> {
      const books = await getAllBooks();
      assert.strictEqual(books.length, expectedoutputIds.length);
      books.forEach((book)=>{
        assert.ok(expectedoutputIds.includes(book.bookId));
      });
    });
    after(async () => {
      await mongoose.connection.db.dropDatabase();
      await closeConnection();
    });
  });
  describe('Test with invalid mongoDB connection', () => {
    before(async () => {
      await connectToMongoDB(URIs.invalidURI.uri);
      await populate();
    });
    it(`should return 'null' when mongo connection is made with invalid uri`, async ()=> {
      assert.strictEqual(await getAllBooks(), null);
    });
  });
});
