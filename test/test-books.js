const {addNewBook} = require('../index');
const mongoose = require('mongoose');
const {changePublisherTestDesign} = require('./test-changePublisherById');
const {deleteBookByIdTestDesign} = require('./test-deleteBookById');
const {getAllBooksTestDesign} = require('./test-getAllBooks');
const {getBookByAuthorTestDesign} = require('./test-getBooksByAuthor');
const {addNewBookTestDesign} = require('./test-addnewBooks');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoServer;
let uri;
const FunctionsToBeTested = [
  addNewBookTestDesign,
  getAllBooksTestDesign,
  changePublisherTestDesign,
  deleteBookByIdTestDesign,
  getBookByAuthorTestDesign,
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

describe('test crud operations for Books', () => {
  FunctionsToBeTested.forEach((functions) => {
    describe(`${functions.functionName} test`, () => {
      describe(' Tests with connection', ()=>{
        before(async () => {
          mongoServer = await MongoMemoryServer.create();
          uri = await mongoServer.getUri();
          await mongoose.connect(uri);
          if (functions.populate === true) {
            await populate();
          }
        });
        functions.withConnection();
        after(async ()=>{
          await mongoose.disconnect();
          await mongoServer.stop();
        });
      });
      describe('Test without Connection', () => {
        functions.withoutConnection();
      });
    });
  });
});
