const mongoose = require('mongoose');
const assert = require('assert');
const {addNewBook, getAllBooks} = require('../index');
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
const expectedoutputIds = ['1234', '1235', '1236', '5678'];
describe('getAllBooks test', ()=> {
  describe('Test with mongoDB connection', ()=> {
    before(async () => {
      mongoServer = await MongoMemoryServer.create();
      const uri = await mongoServer.getUri();
      await mongoose.connect(uri);
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
      await mongoose.disconnect();
      await mongoServer.stop();
    });
  });
  describe('Test with invalid mongoDB connection', () => {
    it(`should return 'null' when mongo connection is made with invalid uri`, async ()=> {
      assert.strictEqual(await getAllBooks(), null);
    });
  });
});
