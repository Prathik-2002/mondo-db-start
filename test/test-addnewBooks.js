const mongoose = require('mongoose');
const assert = require('assert');
const Book = require('../schema');
const {MongoMemoryServer} = require('mongodb-memory-server');
const {addNewBook} = require('../index');
let mongoServer;

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
    mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    await mongoose.connect(uri);
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
    await mongoose.disconnect();
    await mongoServer.stop();
  });
});
