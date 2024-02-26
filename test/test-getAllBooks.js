const assert = require('assert');
const {getAllBooks} = require('../index');
const getAllBooksTestDesign = {
  functionName: 'getAllBooks',
  populate: true,
  withConnection: () => {
    const expectedoutputIds = ['1234', '1235', '1236', '5678'];
    it(`should return ${expectedoutputIds.join(', ')} ]`, async ()=> {
      const books = await getAllBooks();
      assert.strictEqual(books.length, expectedoutputIds.length);
      books.forEach((book)=>{
        assert.ok(expectedoutputIds.includes(book.bookId));
      });
    });
  },
  withoutConnection: () => {
    it(`should return 'null' when mongo connection is made with invalid uri`, async ()=> {
      assert.strictEqual(await getAllBooks(), null);
    });
  },
};

module.exports = {getAllBooksTestDesign};

