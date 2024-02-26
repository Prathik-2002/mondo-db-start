const assert = require('assert');
const {getBookByAuthor} = require('../index');

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
const getBookByAuthorTestDesign = {
  functionName: 'getBookByAuthor',
  populate: true,
  withConnection: () => {
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
  },
  withoutConnection: () => {
    getBookByAuthorTestCases.forEach((testcase)=>{
      it(`should return null}`, async ()=> {
        assert.strictEqual(await getBookByAuthor(testcase.input), null);
      });
    });
  },
};
module.exports = {getBookByAuthorTestDesign, getBookByAuthorTestCases};

