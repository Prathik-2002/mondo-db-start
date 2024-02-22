const mongoose = require('mongoose');
const assert = require('assert');
const Book = require('../schema');

const {addNewBook, deleteBookById, closeConnection, connectToMongoDB} = require('../index');
const URIs = {
  validURI: {uri: 'mongodb://localhost/Demo', connectionResult: true},
  invalidURI: {uri: 'mongod://localhost/Demo', connectionResult: false},
  testURI: {uri: 'mongodb://localhost/Test', connectionResult: true},
};
const deleteBookByIdTestcases = [
  {input: '1234', output: true},
  {input: '1333', output: false},
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
describe('Delete Books By Id test', ()=>{
  describe('Test with mongodb connection', ()=>{
    before(async () => {
      await connectToMongoDB(URIs.testURI.uri);
      await populate();
    });
    deleteBookByIdTestcases.forEach((testcase) => {
      it(`should return ${testcase.output} for id ${testcase.input}`, async ()=>{
        assert.strictEqual(await deleteBookById(testcase.input), testcase.output);
        assert.strictEqual(await Book.exists({bookId: testcase.input}), null);
      });
    });
    after(async () => {
      await mongoose.connection.db.dropDatabase();
      await closeConnection();
    });
  });
  describe('Test without mongodb connection', ()=>{
    deleteBookByIdTestcases.forEach((testcase) => {
      it(`should return ${false} for id ${testcase.input}`, async ()=>{
        assert.strictEqual(await deleteBookById(testcase.input), false);
      });
    });
  });
});
