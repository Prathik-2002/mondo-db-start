const mongoose = require('mongoose');
const assert = require('assert');
const Book = require('../schema');

const {addNewBook, closeConnection, connectToMongoDB} = require('../index');
const URIs = {
  validURI: {uri: 'mongodb://localhost/Demo', connectionResult: true},
  invalidURI: {uri: 'mongod://localhost/Demo', connectionResult: false},
  testURI: {uri: 'mongodb://localhost/Test', connectionResult: true},
};

const addNewBookTestCases = [
  {
    functionArguments: [
      '1111',
      'The Jungle book',
      'Rudyard Kipling',
      '409',
      ['Adventure', 'Fiction'],
      'Macmillan',
      3,
    ],
    result: true,
  },
  {
    functionArguments: [
      '1112',
      'The Jungle book',
      'Rudyard Kipling',
      '409',
      ['Adventure', 'Fiction'],
      'Macmillan',
      3,
    ],
    result: true,
  },
  {
    functionArguments: [
      '1113',
      'Pennywise',
      'Stephan King',
      '489',
      ['Horror', 'Thriller'],
      'Simon & Schuster',
      9,
    ],
    result: true,
  },
  {
    functionArguments: [
      '1113',
      'Pennywise',
      'Stephan King',
      '489',
      ['Horror', 'Thriller'],
      'Simon & Schuster',
      9,
    ],
    result: false,
  },
];
describe('AddNewBook test', ()=>{
  before(async () => {
    await connectToMongoDB(URIs.testURI.uri);
  });
  addNewBookTestCases.forEach((testcase) => {
    it(`should ${testcase.result?'':'not'} insert into collection for inputs [${(testcase
        .functionArguments
        .join(', '))}]`,
    async ()=>{
      assert.strictEqual(await addNewBook(...(testcase.functionArguments)), testcase.result);
      assert.notStrictEqual(await Book.exists({bookId: testcase.functionArguments[0]}), null);
    });
  });
  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await closeConnection();
  });
});
