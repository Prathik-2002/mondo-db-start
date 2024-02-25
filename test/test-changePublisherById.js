const mongoose = require('mongoose');
const assert = require('assert');
const Book = require('../schema');
const {addNewBook, changePublisherById} = require('../index');
const {MongoMemoryServer} = require('mongodb-memory-server');
let mongoServer;

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
const changePublisherByIdTestCases = [
  {
    id: '1239',
    newPublisher: 'JAmes',
    expectedresult: false,
  },
  {
    id: '1235',
    newPublisher: 'Kim J',
    expectedresult: true,
  },
];
describe('Change Publisher By Id test', ()=>{
  describe('Test with mongoDB connection', () => {
    before(async () => {
      mongoServer = await MongoMemoryServer.create();
      const uri = await mongoServer.getUri();
      await mongoose.connect(uri);
      await populate();
    });
    changePublisherByIdTestCases.forEach((testcase) => {
      it(`should return ${testcase
          .expectedresult} for publisher change bookid ${testcase.id} `, async ()=>{
        assert.strictEqual(await changePublisherById(testcase.id,
            testcase.newPublisher), testcase.expectedresult);
        if (testcase.expectedresult === true) {
          const book = await Book.findOne({bookId: testcase.id}, {publisher: 1});
          assert.strictEqual(book.publisher, testcase.newPublisher);
        }
      });
    });
    after(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
    });
  });
  describe('Test without mongoDB connection', () => {
    changePublisherByIdTestCases.forEach((testcase) => {
      it(`should return ${false} for publisher change bookid ${testcase.id} `, async ()=>{
        assert.strictEqual(await changePublisherById(testcase.id,
            testcase.newPublisher), false);
      });
    });
  });
});
