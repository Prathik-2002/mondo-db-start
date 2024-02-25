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
    isExist: true,
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
    isExist: true,
  },
  {
    functionArguments: [
      '1119',
      null,
      'Rudyard Kipling',
      '409',
      ['Adventure', 'Fiction'],
      'Macmillan',
      3,
    ],
    isExist: false,
    result: false,
  },
  {
    functionArguments: [
      null,
      'The Jungle book',
      'Rudyard Kipling',
      '409',
      ['Adventure', 'Fiction'],
      'Macmillan',
      3,
    ],
    isExist: false,
    result: false,
  },
  {
    functionArguments: [
      '2213',
      'The Jungle book',
      null,
      '409',
      ['Adventure', 'Fiction'],
      'Macmillan',
      3,
    ],
    isExist: false,
    result: false,
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
    isExist: true,
    result: true,
  },
  {
    functionArguments: [
      '1113',
      'Pennywise 2',
      'Stephan King',
      '489',
      ['Horror', 'Thriller'],
      'Simon & Schuster',
      9,
    ],
    isExist: false,
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
      if (testcase.isExist) {
        assert.notStrictEqual(await Book.exists({bookId: testcase.functionArguments[0],
          bookName: testcase.functionArguments[1]}), null);
      } else {
        assert.strictEqual(await Book.exists({bookId: testcase.functionArguments[0],
          bookName: testcase.functionArguments[1]}), null);
      }
    });
  });
  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
});
