const mongoose = require('mongoose');
const assert = require('assert');
const {getBookByAuthor, addNewBook} = require('../index');
const {MongoMemoryServer} = require('mongodb-memory-server');
let mongoServer;

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
  describe('Test with mongoDB connection', ()=> {
    before(async () => {
      mongoServer = await MongoMemoryServer.create();
      const uri = await mongoServer.getUri();
      await mongoose.connect(uri);
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
      await mongoose.disconnect();
      await mongoServer.stop();
    });
  });
  describe('Test with invalid MongoDB Connection', () => {
    getBookByAuthorTestCases.forEach((testcase)=>{
      it(`should return null}`, async ()=> {
        assert.strictEqual(await getBookByAuthor(testcase.input), null);
      });
    });
  });
});
